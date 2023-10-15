import { ArmyUnit } from '../ArmyUnit/ArmyUnit.tsx';
import { FC, useEffect, useState } from 'react';
import { GroupProps } from '@react-three/fiber';
import { generateArmyUnits } from './Army.utils.ts';

export interface ArmyProps extends GroupProps {
    armyCount: number;
    end?: number;
    faction: number;
    start?: number;
}

export const Army: FC<ArmyProps> = ({ armyCount, end = 0, faction, numberVisible, start = 0, ...props }) => {
    const [armyUnits, setArmyUnits] = useState<ArmyUnit[]>([])

    useEffect(() => {
        setArmyUnits(generateArmyUnits(armyCount));
        console.log(armyCount);
    }, [armyCount]);

    console.log(start, armyUnits.length - end);

    return <group {...props}>
        {armyUnits.slice(start, armyUnits.length - end).map((armyUnit, index) => <ArmyUnit key={index} position={[armyUnit.x, armyUnit.y, armyUnit.z]} armyCount={armyUnit.size} faction={faction} />) }
    </group>
}
