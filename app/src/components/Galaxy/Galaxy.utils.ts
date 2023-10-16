import { Object3D, Scene, Vector3 } from "three"
import { GalaxyPlanet } from "../../models/game.model";

const scene = new Scene();
const center = new Object3D();
scene.add(center);

const planetPosition = new Object3D();
planetPosition.position.setZ(-10);
center.add(planetPosition);

const worldPosition = new Vector3();

export const determineGalaxyPlanetPositions = (planets: GalaxyPlanet[]): GalaxyPlanet[] => {
    planets.forEach(planet => {
        const { x, y } = planet;
        center.rotation.fromArray([(Math.PI / 180) * (y - 3) * 10, (Math.PI / 180) * -x * 10, 0]);

        planetPosition.getWorldPosition(worldPosition);
        planet.position = worldPosition.toArray();
    });

    return planets;
}