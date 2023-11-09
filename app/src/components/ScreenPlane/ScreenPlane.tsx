import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Screen, ScreenClickEvent, ScreenProps } from "../../screen/Screen";
import { Interactive, XRInteractionHandler } from "@react-three/xr";
import { Object3DProps, ThreeEvent, useFrame } from "@react-three/fiber";
import { CanvasTexture, DoubleSide, VideoTexture } from "three";

interface ScreenPlaneProps
  extends Omit<ScreenProps, "onCanvasCreated" | "onUpdate">,
    Object3DProps {
  renderCanvas?: boolean;
}

export const ScreenPlane: FC<ScreenPlaneProps> = ({
  children,
  height,
  renderCanvas,
  width,
  ...object3DProps
}) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  const [clickEvent, setClickEvent] = useState<ScreenClickEvent>();
  const [hoverEvent, setHoverEvent] = useState<ScreenClickEvent>();
  const [texture, setTexture] = useState<VideoTexture>();

  const handleCanvasCreated = (canvas: HTMLCanvasElement) => {
    if (renderCanvas) {
      canvas.setAttribute(
        "style",
        "position: fixed; top: 0; left: 0; border: solid 1px black",
      );
      document.body.appendChild(canvas);

      setCanvas(canvas);
    }

    const video = document.createElement("video");
    video.srcObject = canvas.captureStream();
    video.muted = true;
    video.play();

    const canvasTexture = new VideoTexture(video);
    setTexture(canvasTexture);
  };

  const handleClick = ({
    intersections,
  }: XRInteractionHandler | ThreeEvent<MouseEvent>) => {
    if (!intersections[0]?.uv) {
      return;
    }

    const { uv } = intersections[0];
    const x = uv.x * width;
    const y = (1 - uv.y) * height;
    setClickEvent({ x, y });
  };

  const handleMove = ({ intersections }) => {
    if (!intersections[0]?.uv) {
      return;
    }

    const { uv } = intersections[0];
    const x = uv.x * width;
    const y = (1 - uv.y) * height;
    setHoverEvent({ x, y });
  }

  const handleUpdate = () => {
    if (!texture) {
      return;
    }

    // texture.needsUpdate = true;
  };

  useEffect(() => {
    return () => {
      if (canvas) {
        document.body.removeChild(canvas);
        setCanvas(undefined);
      }
    };
  }, [canvas]);

  return (
    <Interactive onMove={handleMove} onSelect={handleClick}>
      <object3D {...object3DProps}>
        <mesh scale={[width / 1000, height / 1000, 1]} onClick={handleClick} onPointerMove={handleMove}>
          <planeGeometry />
          {texture && <meshBasicMaterial map={texture} side={DoubleSide} />}
        </mesh>
        <Screen
          clickEvent={clickEvent}
          hoverEvent={hoverEvent}
          height={height}
          onCanvasCreated={handleCanvasCreated}
          onUpdate={handleUpdate}
          width={width}
        >
          {children}
        </Screen>
      </object3D>
    </Interactive>
  );
};
