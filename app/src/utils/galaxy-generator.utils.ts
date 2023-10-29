import { determineGalaxyPlanetPositions } from "../components/Galaxy/Galaxy.utils";
import { GalaxyPlanet } from "../models/game.model";

export enum GalaxySize {
  SMALL = 9,
  MEDIUM = 18,
  LARGE = 36,
}

const numberOfPlanetsMap = new Map();
numberOfPlanetsMap.set(GalaxySize.SMALL, 10);
numberOfPlanetsMap.set(GalaxySize.MEDIUM, 10);
numberOfPlanetsMap.set(GalaxySize.LARGE, 10);

const MAX_ATTEMPTS = 2000;
export function generateGalaxy(size: GalaxySize): GalaxyPlanet[] {
  const planets: GalaxyPlanet[] = [];
  const numberOfPlanets = (size * 6) / 5.4;
  let attempts = 0;

  while (planets.length < numberOfPlanets && ++attempts < MAX_ATTEMPTS) {
    const x = 1 + Math.floor(Math.random() * (size - 2));
    const y = Math.floor(Math.random() * 5) + 1;

    if (planets.some(({ x: planetX, y: planetY }) => x === planetX && y === planetY)) {
        continue;
    }
    // for (let i = x - 1; i <= x + 1; i++) {
    //   const xyTaken = planets.some(
    //     ({ x: planetX, y: planetY }) => i === planetX && y === planetY,
    //   );
    //   if (xyTaken) {
    //     continue;
    //   }
    // }

    planets.push({
      x,
      y,
      id: attempts.toString(),
      faction: 0,
      scale: 0.5 + Math.random() * 0.5,
      armyCount: 5,
    });
  }

  if (attempts === MAX_ATTEMPTS) {
    console.error("Something went wrong while generating galaxy!");
    return [];
  }

  determineGalaxyPlanetPositions(planets);

  return planets;
}

export function assignPlanetToPlayer(planets: GalaxyPlanet[], factionId: number) {
    const planet = planets.find(({ faction }) => faction === 0);
    console.log(factionId, planet, planets);
    if (planet) {
        planet.armyCount = 50;
        planet.faction = factionId;
        planet.scale = 1;
    }
}
