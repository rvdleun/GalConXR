import { Army, ArmyProps } from "../Army/Army.tsx";
import { FC, useEffect, useRef, useState } from "react";
import { Group, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useDispatch } from "react-redux";
import { landArmies } from "../../redux/game/game.slice.tsx";

export interface ArmyMovementProps extends ArmyProps {
  id: number;
  from: [number, number, number];
  planetId?: string;
  speed?: number;
  to: [number, number, number];
}

export const ArmyMovement: FC<ArmyMovementProps> = ({
  armyCount,
  faction,
  from,
  planetId,
  speed = 1,
  to,
}) => {
  const dispatch = useDispatch();

  const ref = useRef<Group>(new Group());
  const [destination, setDestination] = useState<Vector3>();
  const [distanceLeft, setDistanceLeft] = useState<number>(-1);
  const [distanceTravelled, setDistanceTravelled] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);
  const [nextUpdate, setNextUpdate] = useState<number>(0);
  const [position, setPosition] = useState<Vector3>();
  const [start, setStart] = useState<number>(0);
  const [units, setUnits] = useState<number>(0);

  useEffect(() => {
    const destination = new Vector3();
    const position = new Vector3();
    const startPosition = new Vector3();

    destination.fromArray(to);
    position.fromArray(from);
    startPosition.fromArray(from);

    setDestination(destination);
    setPosition(position);
    setDistanceLeft(startPosition.distanceTo(destination));
  }, []);

  useFrame((state, delta) => {
    if (!destination || !position) {
      return;
    }

    const translateZ = delta * speed;
    setDistanceTravelled(distanceTravelled + translateZ);
    setDistanceLeft(distanceLeft - translateZ);
    ref.current!.translateZ(translateZ);

    if (distanceTravelled < 0.1) {
      ref.current!.lookAt(destination);
    }

    setNextUpdate(nextUpdate - delta);
    if (nextUpdate > 0) {
      return;
    }

    setNextUpdate(0.5);
    if (distanceLeft <= 0) {
      const newStart = Math.ceil(-distanceLeft / 4);

      if (planetId && newStart !== start) {
        const toLand = units[newStart - 1];
        if (toLand) {
          console.log(ref.current);
          dispatch(
            landArmies({
              armyCount: toLand.size,
              faction,
              planetId,
            }),
          );
        }

        setStart(newStart);
      }
    }
    setEnd(setUnits.length - Math.ceil(distanceTravelled / 4));
  });

  if (!position) {
    return null;
  }

  return (
    <group ref={ref} position={position}>
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
