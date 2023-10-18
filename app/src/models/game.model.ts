import { Color } from "three";
import { AiMethod } from "../utils/ai-player.utils";

export const FactionColor = {
  1: new Color("#ff0000"),
  2: new Color("#00ff00"),
  3: new Color("#0000ff"),
  4: new Color("#ffff00"),
  5: new Color("#ff00ff"),
  6: new Color("#00ffff"),
};

export enum PlayerType {
  AI = 'ai',
  HUMAN = 'human'
} 

export interface ArmyMovement {
  from: string;
  to: string;
  armyCount: number;
}

export interface GalaxyPlanet {
  id: string;
  armyCount: number;
  faction: number;
  position?: [number, number, number];
  scale: number;
  x: number;
  y: number;
}

export interface Player {
  aiMethod?: AiMethod;
  faction: number;
  type: PlayerType;
}