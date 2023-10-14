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

  return planets.map(({ id, armyCount, faction, x, y }) => (
    <object3D
      key={id}
      rotation={[(Math.PI / 180) * (y - 3) * 10, (Math.PI / 180) * -x * 10, 0]}
    >
      <Planet
        selected={selectedPlanetId === id}
        armyCount={armyCount}
        faction={faction}
        planetId={id}
        position={[0, 0, -10]}
      />
    </object3D>
  ));
};
