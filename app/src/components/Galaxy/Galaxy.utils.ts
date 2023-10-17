import { Object3D, Scene, Vector3 } from "three";
import { GalaxyPlanet } from "../../models/game.model";

const scene = new Scene();
const center = new Object3D();
scene.add(center);

const planetPosition = new Object3D();
planetPosition.position.setZ(-1);
center.add(planetPosition);

const worldPosition = new Vector3();

export const determineGalaxyPlanetPositions = (
  planets: GalaxyPlanet[],
): GalaxyPlanet[] => {
  planets.forEach((planet) => {
    const { x, y } = planet;
    center.rotation.fromArray([
      0,
      (Math.PI / 180) * -x * 10,
      0,
    ]);
    center.position.setY(y * .2 - .4);

    planetPosition.getWorldPosition(worldPosition);
    planet.position = worldPosition.toArray();
  });

  return planets;
};
