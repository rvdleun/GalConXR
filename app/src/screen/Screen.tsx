import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { ThemePalette } from "../utils/theme.utils";

export type EventListenerEventData = {
  type: "click" | "move";
  x: number;
  y: number;
};
export type EventListenerFunction = (event: EventListenerEventData) => void;

export interface ScreenClickEvent {
  executed?: boolean;
  x: number;
  y: number;
}

export interface ScreenProps extends PropsWithChildren {
  clickEvent?: ScreenClickEvent;
  height: number;
  onCanvasCreated: (canvas: HTMLCanvasElement) => void;
  onUpdate: () => void;
  width: number;
}

interface ScreenContextProps {
  addEventListener: (func: EventListenerFunction) => void;
  context: CanvasRenderingContext2D;
  height: number;
  onUpdate: () => void;
  removeEventListener: (func: EventListenerFunction) => void;
  width: number;
}
const defaultScreenContextValue: ScreenContextProps = {
  addEventListener: () => {},
  context: document.createElement("canvas").getContext("2d")!,
  height: 0,
  onUpdate: () => {},
  removeEventListener: () => {},
  width: 0
};
export const ScreenContext = createContext<ScreenContextProps>(
  defaultScreenContextValue,
);

export const Screen: FC<ScreenProps> = ({
  children,
  clickEvent,
  height,
  onCanvasCreated,
  onUpdate = () => {},
  width,
}) => {
  const [contextData, setContextData] = useState<ScreenContextProps>(
    defaultScreenContextValue,
  );
  const [eventListeners, setEventListeners] = useState<EventListenerFunction[]>(
    [],
  );

  useEffect(() => {
    const addEventListener = (func: EventListenerFunction) => {
      setEventListeners(listeners => ([...listeners, func]));
    };

    const removeEventListener = (func: EventListenerFunction) => {
      setEventListeners(listeners => listeners.filter((listener) => listener !== func));
    };

    const canvas = document.createElement("canvas");
    canvas.height = height;
    canvas.width = width;

    const context = canvas.getContext("2d")!;
    context.fillStyle = ThemePalette.dark;
    context.fillRect(0, 0, width, height);

    setContextData({
      addEventListener,
      context,
      height,
      onUpdate,
      removeEventListener,
      width
    });

    onCanvasCreated(canvas);
  }, []);

  useEffect(() => {
    if (!clickEvent || clickEvent.executed) {
      return;
    }

    const { x, y } = clickEvent;
    eventListeners.forEach((listener) => listener({ type: "click", x, y }));
    clickEvent.executed = true;
  }, [clickEvent, eventListeners]);

  if (!contextData) {
    return null;
  }

  return (
    <ScreenContext.Provider value={contextData}>
      {children}
    </ScreenContext.Provider>
  );
};
