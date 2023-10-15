const sizes = [25, 10, 5, 1];

export interface ArmyUnit {
    size: number;
    x: number;
    y: number;
    z: number;
}

export const generateArmyUnits = (armySize: number): ArmyUnit[] => {
    const armyUnits: ArmyUnit[] = [];
    while(armySize > 0) {
        const size = sizes.find(size => size <= armySize)!;

        armyUnits.push({
            size,
            x: -1 + (Math.random() * 2),
            y: -1 + (Math.random() * 2),
            z: armyUnits.length * -4
        });
        armySize-=size;
    }
    return armyUnits;
}
