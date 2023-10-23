import { Vector3 } from "three";

export function addRandomValueToAxes(vector3: Vector3, min: number, max?: number) {
    if (max === undefined) {
        max = -min;
    }

    vector3.x+=min + ((max - min) * Math.random());
    vector3.y+=min + ((max - min) * Math.random());
    vector3.z+=min + ((max - min) * Math.random());
}