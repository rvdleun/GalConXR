import { useDispatch, useSelector } from "react-redux";
import { selectGameHeight } from "../redux/ui/ui.selectors";
import { setGameHeight } from "../redux/ui/ui.slice";
import { useXR } from "@react-three/xr";
import { useEffect } from "react";

export const useGameHeight = () => {
  const dispatch = useDispatch();

  const { isPresenting, player } = useXR();
  const height = useSelector(selectGameHeight) || 0;

  const setHeight = (newHeight: number) => {
    dispatch(setGameHeight(newHeight));
  };

  useEffect(() => {
    const newHeight = isPresenting ? player.children[0].position.y : 0;
    if (height === newHeight) {
      return;
    }

    setHeight(newHeight);
  }, [isPresenting]);

  return { height, setHeight };
};
