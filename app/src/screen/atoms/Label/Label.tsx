import { FC, useContext, useEffect } from "react";
import { ScreenContext } from "../../Screen";

export interface LabelProps {
  text: string;
  x: number;
  y: number;
}

function clearLabel(
  context: CanvasRenderingContext2D,
  { text, x, y }: LabelProps,
) {
  context.clearRect(x, y, 100, 100);
}

function drawLabel(
  context: CanvasRenderingContext2D,
  { text, x, y }: LabelProps,
) {
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, x, y);
}

export const Label: FC<LabelProps> = (props) => {
  const { context } = useContext(ScreenContext);

  useEffect(() => {
    drawLabel(context, props);

    return () => {
      clearLabel(context, props);
    };
  }, [context, props]);

  return null;
};
