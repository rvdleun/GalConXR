import { ArmyUnit as ArmyUnitData } from "./Army.utils.ts";
import { FC, useEffect, useState } from "react";
import { GroupProps } from "@react-three/fiber";
import { generateArmyUnits } from "./Army.utils.ts";
import { ArmyUnit } from "../ArmyUnit/ArmyUnit.tsx";

export interface ArmyProps extends GroupProps {
  armyCount: number;
  end?: number;
  faction: number;
  onUnits?: (units: ArmyUnitData[]) => void;
  start?: number;
}

export const Army: FC<ArmyProps> = ({
  armyCount,
  end = 0,
  faction,
  onUnits,
  start = 0,
  ...props
}) => {
  const [armyUnits, setArmyUnits] = useState<ArmyUnitData[]>([]);

  useEffect(() => {
    const newArmyUnits = generateArmyUnits(armyCount);
    setArmyUnits(newArmyUnits);
    onUnits && onUnits(newArmyUnits);
  }, [armyCount]);

  return (
    <group {...props}>
      {armyUnits.slice(start, armyUnits.length - end).map((armyUnit, index) => (
        <ArmyUnit
          key={index}
          position={[armyUnit.x, armyUnit.y, armyUnit.z]}
          armyCount={armyUnit.size}
          faction={faction}
        />
      ))}
    </group>
  );
};
