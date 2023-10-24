import { MeshBasicMaterial } from "three";
import { FactionColor } from "../models/game.model";

const factionMaterials = new Map<MeshBasicMaterial>();

export const getFactionShipMaterial = (faction: number) => {
  if (!FactionColor[faction]) {
    faction = 0;
  }

  const id = `faction-ship-${faction}`;
  if (!factionMaterials.has(id)) {
    factionMaterials.set(
      id,
      new MeshBasicMaterial({
        color: FactionColor[faction],
        transparent: true,
        opacity: 0.7,
      }),
    );
  }

  return factionMaterials.get(id);
};
