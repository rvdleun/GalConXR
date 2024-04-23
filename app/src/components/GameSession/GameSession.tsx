import {assignPlanetsToPlayers, GalaxySize, generateGalaxy,} from "../../utils/galaxy-generator.utils.ts";
import {FC, useEffect} from "react";
import {Player, PlayerType} from "../../models/game.model.ts";
import {Galaxy} from "../Galaxy/Galaxy.tsx";
import {useDispatch, useSelector} from "react-redux";
import {selectArmyMovements, selectPlanets, selectSelectedPlanetId,} from "../../redux/game/game.selectors.tsx";
import {reset, setPlanets, setWinner} from "../../redux/game/game.slice.tsx";
import {AiPlayer} from "../AiPlayer/AiPlayer.tsx";
import {ArmyMovement} from "../ArmyMovement/ArmyMovement.tsx";
import {usePlanetUpdate} from "../../hooks/planet-update.hook.tsx";
import {useFrame} from "@react-three/fiber";
import {useKeyboardControls} from "../../hooks/keyboard-controls.tsx";
import {currentDeltaModifier, DeltaModifier, setCurrentDeltaModifier} from "../../utils/delta-modifier.tsx";

export interface GameSessionSettings {
  galaxySize: GalaxySize;
  players: Player[];
}

export interface GameSessionProps {
  settings: GameSessionSettings;
}

let checkForWinner = 0;
export const GameSession: FC<GameSessionProps> = ({ settings }) => {
  const dispatch = useDispatch();

  const armyMovements = useSelector(selectArmyMovements);
  const planets = useSelector(selectPlanets);
  const selectedPlanetId = useSelector(selectSelectedPlanetId);

  useKeyboardControls();
  usePlanetUpdate();

  useEffect(() => {
    const newPlanets = generateGalaxy(settings.galaxySize);
    assignPlanetsToPlayers(
      newPlanets,
      settings.players.length,
      settings.galaxySize,
    );

    dispatch(reset());
    dispatch(setPlanets(newPlanets));
  }, []);

  useFrame((state, delta) => {
    delta*=currentDeltaModifier;

    checkForWinner -= delta;

    if (checkForWinner > 0) {
      return;
    }

    checkForWinner = 5;

    const eligibleFaction = planets.find(({ faction }) => faction !== 0)
      ?.faction;
    if (!eligibleFaction) {
      return;
    }

    const isWinner = !planets.some(
      ({ faction }) => faction !== 0 && faction !== eligibleFaction,
    );
    if (!isWinner) {
      return;
    }

    setCurrentDeltaModifier(DeltaModifier.FREEZE);
    dispatch(setWinner(eligibleFaction));
  });

  if (!planets) {
    return;
  }

  return (
    <>
      <Galaxy planets={planets} selectedPlanetId={selectedPlanetId} />
      {settings.players
        .filter((player) => player.type === PlayerType.AI)
        .map((player) => (
          <AiPlayer key={player.faction} planets={planets} player={player} />
        ))}
      {armyMovements.map((props) => (
        <ArmyMovement key={props.id} {...props} />
      ))}
    </>
  );
};
