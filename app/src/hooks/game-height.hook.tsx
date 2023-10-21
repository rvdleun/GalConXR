import { useDispatch, useSelector } from "react-redux"
import { selectGameHeight } from "../redux/ui/ui.selectors";
import { setGameHeight } from "../redux/ui/ui.slice";
import { useXR } from "@react-three/xr";
import { useEffect } from "react";

export const useGameHeight = () => {
    const dispatch = useDispatch();

    const { isPresenting, player } = useXR();
    const height = useSelector(selectGameHeight) || 0;

    const setHeight = (height: number) => {
        dispatch(setGameHeight(height));
    }

    useEffect(() => {
        console.log(player.position);
        setTimeout(() => {
            console.log(player.position, player);
        }, 100);
        setHeight(isPresenting ? player.children[0].position.y : 0);
    }, [isPresenting]);

    return { height, setHeight };
}