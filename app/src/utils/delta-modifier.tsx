export enum DeltaModifier {
  FREEZE = 0,
  PAUSED = 0.1,
    NORMAL = 1,
}

export let currentDeltaModifier: DeltaModifier = DeltaModifier.NORMAL;

export const setCurrentDeltaModifier = (modifier: DeltaModifier) => {
  currentDeltaModifier = modifier;
}