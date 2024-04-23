import { FC, useEffect, useRef, useState } from "react";
import {Color, MeshBasicMaterial, Object3D, Vector2, Vector3} from "three";
import { FactionColor } from "../../models/game.model.ts";
import * as TWEEN from "@tweenjs/tween.js";
import { Text } from "@react-three/drei";
import { Object3DProps, useFrame } from "@react-three/fiber";
import { useDispatch } from "react-redux";
import { toggleSelectedPlanetId } from "../../redux/game/game.slice.tsx";
import { Interactive, useXR } from "@react-three/xr";
import {PlanetTexture} from "./PlanetTexture.tsx";
import {currentDeltaModifier} from "../../utils/delta-modifier.tsx";

interface PlanetProps extends Object3DProps {
  armyCount: number;
  faction: number;
  planetId: string;
  selected?: boolean;
  scale: number;
}

const NEUTRAL_COLOR = new Color(0x888888);
const ROTATION_SPEED_MIN = 0.15;
const ROTATION_SPEED_MAX = 0.4;

const calculateRotationSpeed = () => (Math.random() < .5 ? -1 : 1) * Math.random() * (ROTATION_SPEED_MAX - ROTATION_SPEED_MIN) + ROTATION_SPEED_MIN;

const object3D = new Object3D();
const vector3 = new Vector3();
export const Planet: FC<PlanetProps> = ({
  armyCount,
  faction,
  planetId,
  selected = false,
  scale = 1,
  ...props
}) => {
  const dispatch = useDispatch();
  const { isPresenting, player } = useXR();
  const [transition, setTransition] =
    useState<TWEEN.Tween<{ r: number; g: number; b: number }>>();
  const materialRef = useRef<MeshBasicMaterial>(new MeshBasicMaterial());
  const rotationSpeedRef = useRef(new Vector2(calculateRotationSpeed(), calculateRotationSpeed()));
  const planetTextureRef = useRef<Object3D>(new Object3D());

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

  useFrame(({ camera }, delta) => {
    delta *= currentDeltaModifier;

    if (isPresenting) {
      textRef.current!.getWorldPosition(object3D.position);
      player.children[0].getWorldPosition(vector3);
      vector3.setY(object3D.position.y);
      object3D.lookAt(vector3);
      textRef.current!.rotation.copy(object3D.rotation);
    } else {
      textRef.current!.lookAt(camera.position);
    }

    planetTextureRef.current!.rotation.x += rotationSpeedRef.current.x * delta;
    planetTextureRef.current!.rotation.y += rotationSpeedRef.current.y * delta;
  });

  return (
    <Interactive onSelect={handleClick}>
      <object3D name={`planet-${planetId}`} {...props} scale={0.075 * scale}>
        <mesh ref={planetTextureRef} onClick={handleClick}>
          <sphereGeometry args={[0.975, 32, 32]} />
          <PlanetTexture isSelected={selected} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            ref={materialRef}
            color={NEUTRAL_COLOR}
            opacity={selected ? 1 : .2}
            transparent
            wireframe
          />
        </mesh>
        <object3D ref={textRef} anchorX="center" anchorY="middle">
          <Text
            color="white"
            position={[0, 0, 1]}
            scale={0.5 / scale}
          >
            {Math.floor(armyCount)}
          </Text>
        </object3D>
      </object3D>
    </Interactive>
  );
};
