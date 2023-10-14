import { FC } from "react";
import { Planet } from "../Planet/Planet.tsx";

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
  return planets.map(({ id, armyCount, faction, x, y }) => (
    <object3D
      key={id}
      rotation={[(Math.PI / 180) * (y - 3) * 10, (Math.PI / 180) * -x * 10, 0]}
    >
      <Planet armyCount={armyCount} faction={faction} position={[0, 0, -10]} />
    </object3D>
  ));
};
