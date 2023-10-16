import { FC } from "react";
import { Planet } from "../Planet/Planet.tsx";
import { GalaxyPlanet } from "../../models/game.model.ts";

export interface GalaxyProps {
  planets: GalaxyPlanet[];
  selectedPlanetId?: string;
}

export const Galaxy: FC<GalaxyProps> = ({ planets, selectedPlanetId }) => {
  return planets.map(({ id, armyCount, faction, position }) => (
    <Planet
      selected={selectedPlanetId === id}
      armyCount={armyCount}
      faction={faction}
      planetId={id}
      position={position}
    />
  ));
};
