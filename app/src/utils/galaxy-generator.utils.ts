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

const generatePlanet = (x: number, y: number, id: string): GalaxyPlanet => ({
  x,
  y,
  id,
  faction: 0,
  scale: 0.5 + Math.random() * 0.5,
  armyCount: 5,
});

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

    planets.push(generatePlanet(x, y, attempts.toString()));
  }

  if (attempts === MAX_ATTEMPTS) {
    console.error("Something went wrong while generating galaxy!");
    return [];
  }

  determineGalaxyPlanetPositions(planets);

  return planets;
}

function setupPlanetForFaction(planet: GalaxyPlanet, factionId: number) {
  planet.armyCount = 50;
  planet.faction = factionId;
  planet.scale = 1;
}

function assignRandomly(planets: GalaxyPlanet[], factions: number) {
  for(let factionId = 1; factionId < factions + 1; factionId++) {
    const planet = planets.find(({ faction }) => faction === 0);
    if (planet) {
      setupPlanetForFaction(planet, factionId);
    } else {
      factionId--;
    }
  }
}

function assignOnOppositeSides(planets: GalaxyPlanet[], factions: number, galaxySize: number) {
  for(let i = 1; i < factions + 1; i++) {
    let xy: number[] = [];
    if (i === 1) {
      xy = [0, 3];
    } else if (i === 2) {
      xy = [galaxySize, 3];
    } else if (i === 3) {
      xy = [Math.ceil(galaxySize / 2), 0];
    } else if (i === 4) {
      xy = [Math.ceil(galaxySize / 2), 6];
    } else {
      return;
    }

    const planet: GalaxyPlanet = generatePlanet(xy[0], xy[1], `player-planet-${i}`);
    setupPlanetForFaction(planet, i);
    planets.push(planet);
  }

  determineGalaxyPlanetPositions(planets);
}

function assignInLargeGalaxy(planets: GalaxyPlanet[], factions: number) {
  for(let i = 1; i < factions + 1; i++) {
    let xy: number[] = [];
    if (i === 1) {
      xy = [0, 3];
    } else if (i === 2 && factions % 2 === 0) {
      xy = [18, 3];
    } else if (i === 3 && factions % 2 === 0) {
      xy = [9, 0];
    } else if (i === 4) {
      xy = [27, 6];
    } else if (i === 2 && factions % 2 !== 0) {
      xy = [12, 3];
    } else if (i === 3 && factions % 2 !== 0) {
      xy = [24, 3];
    } else {
      return;
    }

    const planet: GalaxyPlanet = generatePlanet(xy[0], xy[1], `player-planet-${i}`);
    setupPlanetForFaction(planet, i);
    planets.push(planet);
  }

  determineGalaxyPlanetPositions(planets);
}

export function assignPlanetsToPlayers(planets: GalaxyPlanet[], factions: number, galaxySize: number) {
  if (galaxySize === GalaxySize.LARGE) {
    assignInLargeGalaxy(planets, factions);
  } else {
    assignOnOppositeSides(planets, factions, galaxySize);
  }
}
