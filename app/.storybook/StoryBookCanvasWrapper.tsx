import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BackSide } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import background from "./holodeck-pattern.jpg";
import * as TWEEN from "@tweenjs/tween.js";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";
import store from "../src/redux/store.tsx";
import { Provider } from 'react-redux';
import { FC, PropsWithChildren, useState } from "react";

const Environment: FC<PropsWithChildren> = ({ children }) => {
  const map = useLoader(TextureLoader, background);

  useFrame(() => {
    TWEEN.update();
  });

  return (
    <XR>
      <Hands />
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

export const StoryBookCanvasWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [renderChildren, setRenderChildren] = useState(true);

  const handleResetClick = () => {
    setRenderChildren(false);
    setTimeout(() => setRenderChildren(true), 10);
  }

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
      <Provider store={store}>
        <VRButton />
        <Canvas>
          <Environment>{renderChildren && children}</Environment>
        </Canvas>
      </Provider>
      <button onClick={handleResetClick} style={{ position: "fixed", bottom: "10px", right: "10px" }}>Reset</button>
    </div>
  );
};
