import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BackSide } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import background from "./holodeck-pattern.jpg";
import * as TWEEN from "@tweenjs/tween.js";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";

const Environment = ({ children }) => {
  const map = useLoader(TextureLoader, background);

  useFrame(() => {
    TWEEN.update();
  });

  return (
    <XR>
      <Hands  />
      <Controllers />
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <mesh scale={[1050, 1050, 1050]}>
        <boxGeometry />
        <meshBasicMaterial map={map} side={BackSide} />
      </mesh>
      {children}
    </XR>
  );
};

export const StoryBookCanvasWrapper = ({ children }) => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
      }}
    >
      <VRButton />
      <Canvas>
        <Environment>{children}</Environment>
      </Canvas>
    </div>
  );
};
