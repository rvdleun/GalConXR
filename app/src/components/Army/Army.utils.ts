import { ARMY_UNIT_DISTANCE } from '../ArmyMovement/ArmyMovement.tsx';

const sizes = [5, 1];

export interface ArmyUnit {
  size: number;
  x: number;
  y: number;
  z: number;
}

export const generateArmyUnits = (armySize: number): ArmyUnit[] => {
  const armyUnits: ArmyUnit[] = [];
  while (armySize > 0) {
    const size = sizes.find((size) => size <= armySize)!;

    armyUnits.push({
      size,
      x: 0,
      y: 0,
      z: armyUnits.length * -ARMY_UNIT_DISTANCE,
    });
    armySize -= size;
  }
  return armyUnits;
};
