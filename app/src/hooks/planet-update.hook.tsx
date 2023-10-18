import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePlanetArmyCounts } from "../redux/game/game.slice";

export const usePlanetUpdate = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(updatePlanetArmyCounts());
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);
}