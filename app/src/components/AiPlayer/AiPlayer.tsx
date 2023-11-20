import { FC, useState } from "react";
import { GalaxyPlanet, Player } from "../../models/game.model";
import { useDispatch } from "react-redux";
import { determineNextArmyMovementAction } from "../../utils/ai-player.utils";
import { addArmyMovement } from "../../redux/game/game.slice";
import { useAppFrame } from "../../hooks/app-frame.hook";

interface AiPlayerProps {
  overrideArmyCount?: number;
  planets: GalaxyPlanet[];
  player: Player;
  updateEverySeconds?: number;
}

let nextUpdate: number[] = [0, 0, 0, 0];
export const AiPlayer: FC<AiPlayerProps> = ({
  overrideArmyCount = 0,
  planets,
  player,
  updateEverySeconds = 2,
}) => {
  const dispatch = useDispatch();
  const [shouldMakeMove, setShouldMakeMove] = useState(.8);

  useAppFrame((state, delta) => {
    nextUpdate[player.faction] -= delta;
    if (nextUpdate[player.faction] > 0) {
      return;
    }

    nextUpdate[player.faction] = updateEverySeconds;

    if (Math.random() < shouldMakeMove) {
      setShouldMakeMove(shouldMakeMove - 0.1);
      return;
    }

    setShouldMakeMove(0.6);

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
