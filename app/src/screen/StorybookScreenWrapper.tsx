import { FC, PropsWithChildren, useRef, useState } from "react";
import { Screen } from "./Screen";

interface StorybookScreenWrapperProps extends PropsWithChildren {
  height: number;
  width: number;
}

export const StorybookScreenWrapper: FC<StorybookScreenWrapperProps> = (
  props,
) => {
  const [latestClickEvent, setLatestClickEvent] = useState<{
    x: number;
    y: number;
  }>();
  const [latestHoverEvent, setLatestHoverEvent] = useState<{
    x: number;
    y: number;
  }>();

  const ref = useRef<HTMLDivElement>(document.createElement("div"));

  const handleCanvasCreated = (newCanvas: HTMLCanvasElement) => {
    newCanvas.addEventListener("click", (e) => {
      const rect = newCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setLatestClickEvent({ x, y });
    });

    newCanvas.addEventListener("pointermove", (e) => {
      const rect = newCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setLatestHoverEvent({ x, y });
    });

    newCanvas.style.border = "solid 1px black";
    ref.current!.appendChild(newCanvas);
  };

  return (
    <>
      <div ref={ref} />
      <Screen
        {...props}
        clickEvent={latestClickEvent}
        hoverEvent={latestHoverEvent}
        onCanvasCreated={handleCanvasCreated}
        onUpdate={() => {}}
      />
    </>
  );
};
