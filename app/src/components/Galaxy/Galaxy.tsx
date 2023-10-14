import { FC } from 'react';
import { Planet } from '../Planet/Planet.tsx';

interface GalaxyPlanet {
    id: string;
    armyCount: number;
    faction: number;
    x: number;
    y: number;
}

interface GalaxyProps {
    planets: GalaxyPlanet[];
}

export const Galaxy: FC<GalaxyProps> = ({ planets }) => {
    return <object3D position={[-2, -2, -2]}>
        {         planets.map(({ id, armyCount, faction, x, y }) => <object3D key={id} position={[x, y, 0]}><Planet armyCount={armyCount} faction={faction} /></object3D>)
         }
    </object3D>
}
