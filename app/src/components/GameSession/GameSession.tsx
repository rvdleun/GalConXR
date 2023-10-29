import { assignPlanetToPlayer, GalaxySize, generateGalaxy } from '../../utils/galaxy-generator.utils.ts';
import { FC, useEffect, useState } from 'react';
import { GalaxyPlanet, PlayerType } from '../../models/game.model.ts';
import { Galaxy } from '../Galaxy/Galaxy.tsx';

export interface GameSessionSettings {
    galaxySize: GalaxySize;
    players: PlayerType[];
}

interface GameSessionProps {
    settings: GameSessionSettings
}

export const GameSession: FC<GameSessionProps> = ({ settings }) => {
    const [planets, setPlanets] = useState<GalaxyPlanet[]>([]);

    useEffect(() => {
        const planets = generateGalaxy(settings.galaxySize);
        settings.players.forEach((player, index) => {
            assignPlanetToPlayer(planets, index + 1);
        });

        setPlanets(planets);
    }, []);

    if (!planets) {
        return;
    }

    return <Galaxy planets={planets} />;
}
