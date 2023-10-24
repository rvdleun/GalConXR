import { FC, useEffect, useRef, useState } from "react";
import {
  BufferGeometry,
  CatmullRomCurve3,
  ConeGeometry,
  Curve,
  Euler,
  Group,
  InstancedMesh,
  Matrix4,
  MeshBasicMaterial,
  Object3D,
  Quaternion,
  Vector3,
} from "three";
import { useDispatch } from "react-redux";
import { ArmyUnit, ArmyUnitRenderData } from "../ArmyUnit/ArmyUnit.tsx";
import { useFrame, useThree } from "@react-three/fiber";
import {
  landArmies,
  removeArmyMovement,
} from "../../redux/game/game.slice.tsx";
import { addRandomValueToAxes } from "../../utils/vector3.utils.ts";
import { getFactionShipMaterial } from "../../utils/faction.utils.tsx";

const object3D = new Object3D();
object3D.scale.set(0.0175, 0.025, 0.0625);
export const ARMY_UNIT_DISTANCE = 0.05;

export interface ArmyUnitProps {
  armyUnits: ArmyUnitRenderData[];
}

const geometry = new ConeGeometry();
const matrix = new Matrix4();
matrix.makeRotationX(Math.PI / 2); // Rotate around the Y-axis
geometry.applyMatrix4(matrix);

function CurveVisualisation({ curve }: { curve: Curve<Vector3> }) {
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

export interface ArmyUnitData extends ArmyUnitRenderData {
  delay: number;
  landed?: boolean;
  path: Curve<Vector3>;
  progress: number;
}

export interface ArmyMovementProps {
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
  const ref = useRef<Group>(new Group());

  const [armies, setArmies] = useState<ArmyUnitData[]>([]);
  const [destination, setDestination] = useState<Object3D>();
  const [instancedMesh, setInstancedMesh] = useState<InstancedMesh>();
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const fromPlanet = scene.getObjectByName(`planet-${from}`);
    const toPlanet = scene.getObjectByName(`planet-${to}`);

    if (!fromPlanet || !toPlanet) {
      console.error(
        "ArmyMovement created, but not all planets found: ",
        from,
        to,
      );
      return;
    }

    const distance = fromPlanet.position.distanceTo(toPlanet.position);
    const armies = [];

    for (let i = 0; i < armyCount; i++) {
      object3D.position.copy(fromPlanet.position).lerp(toPlanet.position, 0.5);
      addRandomValueToAxes(object3D.position, distance * 0.1);

      const midPoint = new Vector3().copy(object3D.position);
      const path = [fromPlanet.position, midPoint, toPlanet.position];
      armies.push({
        delay: i * ARMY_UNIT_DISTANCE,
        armyCount: 1,
        faction,
        position: fromPlanet.position.toArray(),
        path: new CatmullRomCurve3(path),
        progress: 0,
        rotation: new Euler().toArray() as [number, number, number],
        scale: 1 + Math.random(),
        visible: false,
      });
    }

    setArmies(armies);
    setDestination(toPlanet);

    const material = getFactionShipMaterial(faction);
    const newInstancedMesh = new InstancedMesh(
      geometry,
      material,
      armies.length,
    );

    ref.current!.add(newInstancedMesh);
    setInstancedMesh(newInstancedMesh);

    return () => {
      instancedMesh?.dispose();
    };
  }, []);

  useFrame((state, delta) => {
    if (!destination || !instancedMesh || removed) {
      return;
    }

    if (armies.length === 0) {
      dispatch(removeArmyMovement(id));
      setRemoved(true);
      return;
    }

    armies.forEach((army, index) => {
      army.delay -= delta;
      army.visible = army.delay < 0;

      if (army.visible && !army.landed) {
        army.progress += delta * (speed / army.path.getLength());

        const point = army.path.getPoint(army.progress);
        object3D.position.set(point.x, point.y, point.z);
        object3D.lookAt(army.path.getPoint(Math.min(1, army.progress + 0.1)));
        object3D.updateMatrix();

        army.position = object3D.position.toArray();
        army.rotation = object3D.rotation.toArray() as [number, number, number];

        const landed = object3D.position.distanceTo(destination.position) < 0.1;
        object3D.visible = !landed;
        if (landed && !army.landed) {
          army.landed = true;
          matrix.setPosition(9999, 9999, 9999);
          instancedMesh.setMatrixAt(index, matrix);

          dispatch(
            landArmies({
              armyCount: 1,
              faction,
              planetId: to,
            }),
          );
        } else {
          instancedMesh.setMatrixAt(index, object3D.matrix);
        }
      }
    });

    instancedMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={ref}>
      {showPath &&
        armyCount < 15 &&
        armies.map((army, index) => (
          <CurveVisualisation key={index} curve={army.path} />
        ))}
    </group>
  );
};
