import { generateArmyUnits } from './Army.utils.ts';

describe('Army utils', () => {
    it('should be able to form a correct line of Army Units', () => {
        expect(generateArmyUnits(3).map(unit => unit.size)).toEqual([1, 1, 1]);
        expect(generateArmyUnits(5).map(unit => unit.size)).toEqual([5]);
        expect(generateArmyUnits(8).map(unit => unit.size)).toEqual([5, 1, 1, 1]);
        expect(generateArmyUnits(12).map(unit => unit.size)).toEqual([10, 1, 1]);
        expect(generateArmyUnits(16).map(unit => unit.size)).toEqual([10, 5, 1]);
        expect(generateArmyUnits(49).map(unit => unit.size)).toEqual([25, 10, 10, 1, 1, 1, 1]);
    });
});

