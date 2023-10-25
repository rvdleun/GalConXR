import { FC, useContext, useEffect } from "react";
import {
  EventListenerEventData,
  EventListenerFunction,
  ScreenContext,
} from "../../Screen";
import { cursorWithinBoundaries } from "../../Screen.utils";
import { ThemePalette } from "../../../utils/theme.utils";

export interface ButtonProps {
  onClick?: () => void;
  text: string;
  x: number;
  y: number;
  width?: number;
}

const height = 80;
function clearButton(
  context: CanvasRenderingContext2D,
  { x, y, width = 60 }: ButtonProps,
) {
  context.clearRect(x, y, width, height);
}

function drawButton(
  context: CanvasRenderingContext2D,
  { text, x, y, width = 60 }: ButtonProps,
) {
  context.fillStyle = ThemePalette.dark;
  context.fillRect(x, y, width, height);
  context.lineWidth = 5;
  context.strokeStyle = ThemePalette.success;
  context.strokeRect(x, y, width, height);

  context.fillStyle = ThemePalette.success;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "bold 48px serif";
  context.fillText(text, x + width / 2, y + height / 2);
}

export const Button: FC<ButtonProps> = (props) => {
  const { addEventListener, context, onUpdate, removeEventListener } =
    useContext(ScreenContext);

  const width = props.width!;
  useEffect(() => {
    const handleEvent = (data: EventListenerEventData) => {
      if (!cursorWithinBoundaries(data, { ...props, width, height })) {
        return;
      }

      props.onClick && props.onClick();
      console.log(data);
    };

    addEventListener(handleEvent);
    drawButton(context, props);
    onUpdate();

    return () => {
      clearButton(context, props);
      removeEventListener(handleEvent);
      onUpdate();
    };
  }, [context, props]);

  return null;
};
