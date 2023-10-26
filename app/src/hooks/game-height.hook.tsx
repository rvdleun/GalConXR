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
    if (!isPresenting) {
      setHeight(0);
      return;
    }

    const initialY = player.children[0].position.y;
    setHeight(initialY);
    const interval = setInterval(() => {
      const newHeight = player.children[0].position.y;
      if (newHeight === initialY) {
        return;
      }

      setHeight(newHeight);
      clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, [isPresenting]);

  return { height, setHeight };
};
