import { FC, useEffect, useRef, useState } from "react";
import { Color, MeshBasicMaterial, Object3D } from "three";
import { FactionColor } from "../../models/game.model.ts";
import * as TWEEN from "@tweenjs/tween.js";
import { Text } from "@react-three/drei";
import { Object3DProps, useFrame } from "@react-three/fiber";
import { useDispatch } from "react-redux";
import { toggleSelectedPlanetId } from "../../redux/game/game.slice.tsx";
import { Interactive } from "@react-three/xr";

interface PlanetProps extends Object3DProps {
  armyCount: number;
  faction: number;
  planetId: string;
  selected: boolean;
}

const NEUTRAL_COLOR = new Color(0x888888);

export const Planet: FC<PlanetProps> = ({
  armyCount,
  faction,
  planetId,
  selected,
  ...props
}) => {
  const dispatch = useDispatch();
  const [transition, setTransition] =
    useState<TWEEN.Tween<{ r: number; g: number; b: number }>>();
  const materialRef = useRef<MeshBasicMaterial>(new MeshBasicMaterial());
  const textRef = useRef<Object3D>(new Object3D());

  const handleClick = () => {
    dispatch(toggleSelectedPlanetId(planetId));
  };

  useEffect(() => {
    if (transition) {
      transition.stop();
    }

    const { r, g, b } = FactionColor[faction] || NEUTRAL_COLOR;
    const currentColor = materialRef.current!.color;
    const newTransition = new TWEEN.Tween(currentColor)
      .to({ r, g, b }, 750)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();

    setTransition(newTransition);
  }, [faction]);

  useFrame(({ camera }) => {
    textRef.current!.lookAt(camera.position);
  });

  return (
    <Interactive onSelect={handleClick}>
      <object3D {...props} scale={0.75}>
        <mesh>
          <sphereGeometry args={[0.975, 32, 32]} />
          <meshBasicMaterial color={selected ? "white" : "black"} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            ref={materialRef}
            color={NEUTRAL_COLOR}
            wireframe
          />
        </mesh>
        <object3D ref={textRef} anchorX="center" anchorY="middle">
          <Text
            color={selected ? "black" : "white"}
            position={[0, 0, 1]}
            scale={0.5}
          >
            {armyCount}
          </Text>
        </object3D>
      </object3D>
    </Interactive>
  );
};
