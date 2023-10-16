import { FC } from "react";
import { Planet } from "../Planet/Planet.tsx";
import {
  selectPlanets,
  selectSelectedPlanetId,
} from "../../redux/game/game.selectors.tsx";
import { useSelector } from "react-redux";

export const Galaxy: FC = () => {
  const planets = useSelector(selectPlanets);
  const selectedPlanetId = useSelector(selectSelectedPlanetId);

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
