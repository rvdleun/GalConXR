import { Army, ArmyProps } from "../Army/Army.tsx";
import { FC, useEffect, useRef, useState } from "react";
import { Group, Object3D, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

interface ArmyMovementProps extends ArmyProps {
  from: [number, number, number];
  speed?: number;
  to: [number, number, number];
}

export const ArmyMovement: FC<ArmyMovementProps> = ({
  armyCount,
  faction,
  from,
  speed = 1,
  to,
}) => {
  const ref = useRef<Group>(new Group());
  const [destination, setDestination] = useState<Vector3>();
  const [distanceLeft, setDistanceLeft] = useState<number>(-1);
  const [distanceTravelled, setDistanceTravelled] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);
  const [position, setPosition] = useState<Vector3>();
  const [start, setStart] = useState<number>(0);
  const [startPosition, setStartPosition] = useState<Vector3>();
  const [unitsCount, setUnitsCount] = useState<number>(0);

  useEffect(() => {
    const destination = new Vector3();
    const position = new Vector3();
    const startPosition = new Vector3();

    destination.fromArray(to);
    position.fromArray(from);
    startPosition.fromArray(from);

    setDestination(destination);
    setPosition(position);
    setStartPosition(startPosition);
    setDistanceLeft(startPosition.distanceTo(destination));
  }, [from, to]);

  useFrame((state, delta) => {
    if (!destination || !position) {
      return;
    }

    if (distanceLeft <= 0) {
      setStart(-distanceLeft / 4 + 1);
    }
    setEnd(unitsCount - Math.ceil(distanceTravelled / 4));

    const translateZ = delta * speed;
    setDistanceTravelled(distanceTravelled + translateZ);
    setDistanceLeft(distanceLeft - translateZ);
    ref.current!.translateZ(translateZ);

    if (distanceTravelled < 0.1) {
      ref.current!.lookAt(destination);
    }
  });

  if (!position) {
    console.log("Nothing");
    return null;
  }

  return (
    <group ref={ref} position={position}>
      <Army
        armyCount={armyCount}
        end={end}
        faction={faction}
        onUnitsCount={setUnitsCount}
        start={start}
      />
    </group>
  );
};
