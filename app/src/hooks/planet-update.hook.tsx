import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePlanetArmyCounts } from "../redux/game/game.slice";
import {useFrame} from "@react-three/fiber";
import {currentDeltaModifier} from "../utils/delta-modifier.tsx";

let nextUpdate = 0;
export const usePlanetUpdate = (active: boolean = true) => {
  const dispatch = useDispatch();

    useFrame((state, delta) => {
      delta *= currentDeltaModifier;

      nextUpdate -= delta;

      if (nextUpdate > 0) {
        return;
      }

      dispatch(updatePlanetArmyCounts());
      nextUpdate = 1;
    });
};
