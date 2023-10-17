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

  while(planets.length < numberOfPlanets && attempts < MAX_ATTEMPTS) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * 6);

    for(let i = x - 1; i <= x + 1; i++) {
        const xyTaken = planets.some(({ x: planetX, y: planetY }) => i === planetX && y === planetY);
        if (xyTaken) {
            continue;
        }
      }

    planets.push({
        x,
        y,
        id: attempts.toString(),
        faction: 0,
        armyCount: 5
    });

    attempts++;
  }

  if (attempts === MAX_ATTEMPTS) {
    console.error('Something went wrong while generating galaxy!');
    return [];
  }

  determineGalaxyPlanetPositions(planets);

  return planets;
}
