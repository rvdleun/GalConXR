import { FC, useContext, useEffect } from "react";
import { ScreenContext } from "../../Screen";
import { ThemePalette } from "../../../utils/theme.utils";

export interface LabelProps {
  text: string;
  x: number;
  y: number;
}

function clearLabel(
  context: CanvasRenderingContext2D,
  { text, x, y }: LabelProps,
) {
  const { width } = context.measureText(text);
  context.fillStyle = ThemePalette.dark;
  context.fillRect(x - (width / 2), y - 24, width, 48);
}

function drawLabel(
  context: CanvasRenderingContext2D,
  { text, x, y }: LabelProps,
) {
  context.fillStyle = ThemePalette.success;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "bold 48px serif";

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
