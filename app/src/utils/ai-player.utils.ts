import { ArmyMovement, GalaxyPlanet } from "../models/game.model";

export enum AiMethod {
  RANDOM = "random",
}

function createArmyMovement(from: GalaxyPlanet, to: GalaxyPlanet) {
  return {
    from: from.id,
    to: to.id,
    armyCount: Math.ceil(from.armyCount * 0.5),
  };
}

function determineRandomArmyMovement(
  faction: number,
  planets: GalaxyPlanet[],
): ArmyMovement | undefined {
  const fromPlanets = planets.filter((planet) => planet.faction === faction);
  const toPlanets = planets.filter((planet) => planet.faction !== faction);

  if (fromPlanets.length === 0 || toPlanets.length === 0) {
    return;
  }

  const from = Math.floor(Math.random() * fromPlanets.length);
  const to = Math.floor(Math.random() * toPlanets.length);

  return createArmyMovement(fromPlanets[from], toPlanets[to]);
}

export function determineNextArmyMovementAction(
  method: AiMethod,
  faction: number,
  planets: GalaxyPlanet[],
): ArmyMovement | undefined {
  if (method === AiMethod.RANDOM) {
    return determineRandomArmyMovement(faction, planets);
  }
}
