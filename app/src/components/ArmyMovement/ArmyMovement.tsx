import { Army, ArmyProps } from "../Army/Army.tsx";
import { FC, useEffect, useRef, useState } from "react";
import { BufferGeometry, CatmullRomCurve3, Curve, CurvePath, Euler, Object3D, Vector3 } from "three";
import { useDispatch } from "react-redux";
import { ArmyUnit, ArmyUnitProps } from "../ArmyUnit/ArmyUnit.tsx";
import { useFrame, useThree } from "@react-three/fiber";
import { landArmies, removeArmyMovement } from "../../redux/game/game.slice.tsx";
import { generateArmyUnits } from "./ArmyMovement.utils.ts";
import { addRandomValueToAxes } from "../../utils/vector3.utils.ts";

const object3D = new Object3D();
export const ARMY_UNIT_DISTANCE = 0.25;

function CurveVisualisation({ curve }: { curve: Curve<Vector3>}) {
  if (!curve) {
    return null;
  }

  const points = curve.getPoints(50);
  const geometry = new BufferGeometry().setFromPoints(points);

  return (
    <line>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial attach="material" color="white" />
    </line>
  );
}

interface ArmyUnitData extends ArmyUnitProps {
  delay: number;
  key: number;
  landed?: boolean;
  path: Curve<Vector3>;
  position: [number, number, number];
  progress: number;
  rotation: [number, number, number];
}

export interface ArmyMovementProps extends ArmyProps {
  armyCount: number;
  faction: number;
  id: number;
  from: string;
  showPath?: boolean;
  speed?: number;
  to: string;
}

export const ArmyMovement: FC<ArmyMovementProps> = ({
  armyCount,
  faction,
  from,
  id,
  showPath,
  speed = 0.5,
  to,
}) => {
  const dispatch = useDispatch();
  const { scene } = useThree();

  const [armies, setArmies] = useState<ArmyUnitData[]>([]);
  const [destination, setDestination] = useState<Object3D>();
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const fromPlanet = scene.getObjectByName(`planet-${from}`);
    const toPlanet = scene.getObjectByName(`planet-${to}`);

    if (!fromPlanet || !toPlanet) {
      console.error('ArmyMovement created, but not all planets found: ', from, to);
      return;
    }

    const distance = fromPlanet.position.distanceTo(toPlanet.position);
    const armyUnits = generateArmyUnits(armyCount);
    const armies = armyUnits.map((armyUnitCount, index) => {
      object3D.position.copy(fromPlanet.position).lerp(toPlanet.position, .5);
      addRandomValueToAxes(object3D.position, distance * .1);
  
      const midPoint = new Vector3().copy(object3D.position);
      const path = [fromPlanet.position, midPoint, toPlanet.position];
      return {
        delay: index * ARMY_UNIT_DISTANCE,
        armyCount: armyUnitCount.size,
        faction,
        key: index,
        position: fromPlanet.position.toArray(),
        path: new CatmullRomCurve3(path),
        progress: 0,
        rotation: new Euler().toArray() as [number, number, number],
        scale: 1 + Math.random()
      };
    });

    setArmies(armies);
    setDestination(toPlanet);
  }, []);

  useFrame((state, delta) => {
    if (!destination || removed) {
      return;
    }

    if (armies.length === 0) {
      dispatch(removeArmyMovement(id));
      setRemoved(true);
      return;
    }

    setArmies(armies.map(army => {
      army.delay-=delta;
      army.visible = army.delay < 0;

      if (army.visible && !army.landed) {
        army.progress+=delta * (speed / army.path.getLength());

        const point = army.path.getPoint(army.progress);
        object3D.position.set(point.x, point.y, point.z);
        object3D.lookAt(army.path.getPoint(Math.min(1, army.progress + .1)));

        army.position = object3D.position.toArray();
        army.rotation = object3D.rotation.toArray() as [number, number, number];

        army.landed = object3D.position.distanceTo(destination.position) < 0.1;
        if (army.landed) {
          dispatch(landArmies({
            armyCount: army.armyCount,
            faction,
            planetId: to
          }))
        }
      }

      return army;
    }).filter(army => !army.landed));
  });

  return armies.map(army => <group key={army.key}>
    <ArmyUnit {...army} />
    { showPath && <CurveVisualisation curve={army.path} /> }
  </group>);
};
