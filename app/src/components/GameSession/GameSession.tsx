import { assignPlanetsToPlayers, GalaxySize, generateGalaxy } from '../../utils/galaxy-generator.utils.ts';
import { FC, useEffect, useState } from 'react';
import { GalaxyPlanet, Player, PlayerType } from '../../models/game.model.ts';
import { Galaxy } from '../Galaxy/Galaxy.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectArmyMovements, selectPlanets, selectSelectedPlanetId } from '../../redux/game/game.selectors.tsx';
import { reset, setPlanets } from '../../redux/game/game.slice.tsx';
import { AiPlayer } from '../AiPlayer/AiPlayer.tsx';
import { ArmyMovement } from '../ArmyMovement/ArmyMovement.tsx';
import { usePlanetUpdate } from '../../hooks/planet-update.hook.tsx';

export interface GameSessionSettings {
    galaxySize: GalaxySize;
    players: Player[];
}

export interface GameSessionProps {
    settings: GameSessionSettings
}

export const GameSession: FC<GameSessionProps> = ({ settings }) => {
    const dispatch = useDispatch();
    const armyMovements = useSelector(selectArmyMovements);
    const planets = useSelector(selectPlanets);
    const selectedPlanetId = useSelector(selectSelectedPlanetId);
    usePlanetUpdate();

    useEffect(() => {
        const newPlanets = generateGalaxy(settings.galaxySize);
        assignPlanetsToPlayers(newPlanets, settings.players.length, settings.galaxySize);

        dispatch(reset());
        dispatch(setPlanets(newPlanets));
    }, []);

    if (!planets) {
        return;
    }

    return <>
        <Galaxy planets={planets} selectedPlanetId={selectedPlanetId} />
        { settings.players.filter(player => player.type === PlayerType.AI).map(player => <AiPlayer key={player.faction} planets={planets} player={player} /> ) }
        {armyMovements.map((props) => (
          <ArmyMovement key={props.id} {...props} />
        ))}
    </>
}
