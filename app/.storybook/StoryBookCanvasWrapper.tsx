import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BackSide } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import background from "./holodeck-pattern.jpg";
import * as TWEEN from "@tweenjs/tween.js";
import { XR, Controllers, Hands, ARButton, useXR, RayGrab } from "@react-three/xr";
import store from "../src/redux/store.tsx";
import { Provider } from 'react-redux';
import { FC, PropsWithChildren, useState } from "react";
import { useGameHeight } from "../src/hooks/game-height.hook.tsx";
import { ScreenPlane } from "../src/components/ScreenPlane/ScreenPlane.tsx";
import { Button } from "../src/screen/atoms/Button/Button.tsx";
import { useAppFrame } from "../src/hooks/app-frame.hook.tsx";

interface EnvironmentProps extends PropsWithChildren {
  onResetClick: () => void;
}

const Environment: FC<EnvironmentProps> = ({ children, onResetClick }) => {
  const map = useLoader(TextureLoader, background);
  const { height } = useGameHeight();
    const { isPresenting } = useXR();

  useAppFrame(() => {
    TWEEN.update();
  });

  return (
    <>
      <Hands />
      <Controllers />
      <ambientLight intensity={0.5} />
      {!isPresenting && <mesh scale={[1050, 1050, 1050]}>
        <boxGeometry />
        <meshBasicMaterial map={map} side={BackSide} />
      </mesh> }
      <group position={[0, height, 0]}>
        {children}
        {isPresenting && <ScreenPlane position={[0, -.15, -.5]} width={200} height={80}>
          <Button onClick={onResetClick} x={0} y={0} width={200} text="Reset" />
        </ScreenPlane> }
      </group>
    </>
  );
};

export const StoryBookCanvasWrapperWithStore: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}><StoryBookCanvasWrapper>{children }</StoryBookCanvasWrapper></Provider>
}

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
        <ARButton />
        <Canvas>
        <XR>
          <OrbitControls minDistance={.25} maxDistance={.25} />
          <Environment onResetClick={handleResetClick}>
          {renderChildren && children }
          </Environment>
        </XR>
        </Canvas>
      </Provider>
      <button onClick={handleResetClick} style={{ position: "fixed", bottom: "10px", right: "10px" }}>Reset</button>
    </div>
  );
};
