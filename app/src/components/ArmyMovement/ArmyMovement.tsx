import { Army, ArmyProps } from "../Army/Army.tsx";
import { FC, useEffect, useRef, useState } from "react";
import { Euler, Object3D, Vector3 } from "three";
import { useDispatch } from "react-redux";
import { ArmyUnit, ArmyUnitProps } from "../ArmyUnit/ArmyUnit.tsx";
import { useFrame, useThree } from "@react-three/fiber";
import { landArmies, removeArmyMovement } from "../../redux/game/game.slice.tsx";
import { generateArmyUnits } from "./ArmyMovement.utils.ts";

interface ArmyUnitData extends ArmyUnitProps {
  delay: number;
  key: number;
  landed?: boolean;
  position: [number, number, number];
  rotation: [number, number, number];
}

export interface ArmyMovementProps extends ArmyProps {
  armyCount: number;
  faction: number;
  id: number;
  from: string;
  speed?: number;
  to: string;
}

const object3D = new Object3D();

export const ARMY_UNIT_DISTANCE = 0.25;

export const ArmyMovement: FC<ArmyMovementProps> = ({
  armyCount,
  faction,
  from,
  id,
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

    object3D.position.copy(fromPlanet.position);

    const armyUnits = generateArmyUnits(armyCount);
    const armies = armyUnits.map((armyUnitCount, index) => ({
      delay: index * ARMY_UNIT_DISTANCE,
      armyCount: armyUnitCount.size,
      faction,
      key: index,
      position: fromPlanet.position.toArray(),
      rotation: new Euler().toArray() as [number, number, number],
      scale: 1 + Math.random()
    }));

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
        object3D.position.fromArray(army.position!);
        object3D.lookAt(destination?.position);
        object3D.translateZ(delta);

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

  return armies.map(army => <ArmyUnit {...army} />);
};
