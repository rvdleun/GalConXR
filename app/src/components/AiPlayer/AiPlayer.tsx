import { FC, useEffect } from "react";
import { GalaxyPlanet, Player } from "../../models/game.model";
import { useDispatch } from "react-redux";
import { determineNextArmyMovementAction } from "../../utils/ai-player.utils";
import { addArmyMovement } from "../../redux/game/game.slice";

interface AiPlayerProps {
    overrideArmyCount?: number;
    planets: GalaxyPlanet[];
    player: Player;
    updateEverySeconds?: number;
}

export const AiPlayer: FC<AiPlayerProps> = ({ overrideArmyCount = 0, planets, player, updateEverySeconds = 2 }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            const action = determineNextArmyMovementAction(player.aiMethod!, player.faction, planets);
            if (!action) {
                return;
            }

            if (overrideArmyCount > 0) {
                action.armyCount = overrideArmyCount;
            }

            dispatch(addArmyMovement(action));
        }, updateEverySeconds * 1000);

        return () => clearInterval(interval);
    }, [planets]);

    return null;
}