import { FC, useContext, useEffect, useState } from "react";
import { EventListenerEventData, ScreenContext } from "../../Screen";
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
  context.fillStyle = ThemePalette.dark;
  context.fillRect(x - 5, y - 5, width + 10, height + 10);
}

function drawButton(
  context: CanvasRenderingContext2D,
  { text, x, y, width = 60 }: ButtonProps,
  invertColors = false,
) {
  context.fillStyle = invertColors ? ThemePalette.light : ThemePalette.dark;
  context.fillRect(x, y, width, height);
  context.lineWidth = 5;
  context.strokeStyle = invertColors ? ThemePalette.dark : ThemePalette.light;
  context.strokeRect(x, y, width, height);

  context.fillStyle = invertColors ? ThemePalette.dark : ThemePalette.light;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "bold 48px serif";
  context.fillText(text, x + width / 2, y + height / 2);
}

export const Button: FC<ButtonProps> = (props) => {
  const { addEventListener, context, onUpdate, removeEventListener } =
    useContext(ScreenContext);
  const [isHovering, setIsHovering] = useState(false);

  const width = props.width!;
  useEffect(() => {
    const handleEvent = (data: EventListenerEventData) => {
      const withinBoundaries = cursorWithinBoundaries(data, {
        ...props,
        width,
        height,
      });
      setIsHovering(withinBoundaries);

      if (data.type === "click" && withinBoundaries) {
        props.onClick && props.onClick();
      }
    };

    addEventListener(handleEvent);
    drawButton(context, props, isHovering);
    onUpdate();

    return () => {
      clearButton(context, props);
      removeEventListener(handleEvent);
      onUpdate();
    };
  }, [context, props]);

  useEffect(() => {
    drawButton(context, props, isHovering);
  }, [isHovering]);

  return null;
};
