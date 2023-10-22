import { FC, useEffect, useState } from "react";
import { GalaxyPlanet, Player } from "../../models/game.model";
import { useDispatch } from "react-redux";
import { determineNextArmyMovementAction } from "../../utils/ai-player.utils";
import { addArmyMovement } from "../../redux/game/game.slice";
import { useFrame } from "@react-three/fiber";

interface AiPlayerProps {
  overrideArmyCount?: number;
  planets: GalaxyPlanet[];
  player: Player;
  updateEverySeconds?: number;
}

export const AiPlayer: FC<AiPlayerProps> = ({
  overrideArmyCount = 0,
  planets,
  player,
  updateEverySeconds = 2,
}) => {
  const dispatch = useDispatch();

  const [nextUpdate, setNextUpdate] = useState(updateEverySeconds * 1000);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const action = determineNextArmyMovementAction(
  //       player.aiMethod!,
  //       player.faction,
  //       planets,
  //     );
  //     if (!action) {
  //       return;
  //     }
  //
  //     if (overrideArmyCount > 0) {
  //       action.armyCount = overrideArmyCount;
  //     }
  //
  //     dispatch(addArmyMovement(action));
  //   }, updateEverySeconds * 1000);
  //
  //   return () => clearInterval(interval);
  // }, [planets]);

  useFrame((state, delta) => {
    setNextUpdate(nextUpdate - delta * 1000);
    if (nextUpdate > 0) {
      return;
    }

    setNextUpdate(updateEverySeconds * 1000);

    const action = determineNextArmyMovementAction(
      player.aiMethod!,
      player.faction,
      planets,
    );
    if (!action) {
      return;
    }

    if (overrideArmyCount > 0) {
      action.armyCount = overrideArmyCount;
    }

    dispatch(addArmyMovement(action));
  });

  return null;
};
