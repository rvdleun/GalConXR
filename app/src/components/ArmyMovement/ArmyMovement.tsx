import { Army, ArmyProps } from "../Army/Army.tsx";
import { FC, useEffect, useRef, useState } from "react";
import { Group, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useDispatch } from "react-redux";
import {
  landArmies,
  removeArmyMovement,
} from "../../redux/game/game.slice.tsx";
import { ArmyUnit } from "../Army/Army.utils.ts";
import { useGameHeight } from "../../hooks/game-height.hook.tsx";

export interface ArmyMovementProps extends ArmyProps {
  id: number;
  from: [number, number, number];
  planetId?: string;
  speed?: number;
  to: [number, number, number];
}

const worldPosition = new Vector3();

export const ARMY_UNIT_DISTANCE = 0.25;

export const ArmyMovement: FC<ArmyMovementProps> = ({
  armyCount,
  faction,
  from,
  id,
  planetId,
  speed = 0.5,
  to,
}) => {
  const dispatch = useDispatch();

  const ref = useRef<Group>(new Group());
  const { height } = useGameHeight();
  const [destination, setDestination] = useState<Vector3>();
  const [distanceLeft, setDistanceLeft] = useState<number>(-1);
  const [distanceTravelled, setDistanceTravelled] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);
  const [start, setStart] = useState<number>(0);
  const [units, setUnits] = useState<ArmyUnit[]>([]);

  useEffect(() => {
    const destination = new Vector3();
    const startPosition = new Vector3();

    destination.fromArray(to);
    startPosition.fromArray(from);

    setDestination(destination);
    setDistanceLeft(startPosition.distanceTo(destination));

    ref.current!.position.fromArray(from);
  }, []);

  useEffect(() => {
    if (!destination) {
      return;
    }

    destination.fromArray(to);
    destination.y+=height;

    ref.current!.position.fromArray(from);
    ref.current!.lookAt(destination);
    ref.current!.translateZ(distanceTravelled);
  }, [destination, height]);

  useFrame((state, delta) => {
    if (!destination) {
      return;
    }

    const translateZ = delta * speed;
    setDistanceTravelled(distanceTravelled + translateZ);
    setDistanceLeft(distanceLeft - translateZ);
    ref.current!.translateZ(translateZ);

    if (distanceLeft < -units.length * ARMY_UNIT_DISTANCE) {
      dispatch(removeArmyMovement(id));
      return;
    }

    if (distanceTravelled < 0.1) {
      ref.current!.lookAt(destination);
    }

    if (distanceLeft <= 0) {
      const newStart = Math.ceil(-distanceLeft / ARMY_UNIT_DISTANCE);

      setStart(newStart);

      if (planetId && newStart !== start) {
        const toLand = units[newStart - 1];
        if (toLand) {
          dispatch(
            landArmies({
              armyCount: toLand.size,
              faction,
              planetId,
            }),
          );
        }
      }
    }

    setEnd(units.length - Math.ceil(distanceTravelled / ARMY_UNIT_DISTANCE));
  });

  return (
    <group ref={ref}>
      <Army
        armyCount={armyCount}
        end={end}
        faction={faction}
        onUnits={setUnits}
        start={start}
      />
    </group>
  );
};
