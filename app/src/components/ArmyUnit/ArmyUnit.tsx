import { Object3DProps } from "@react-three/fiber";
import { FC, useEffect, useRef, useState } from "react";

import { Mesh, MeshBasicMaterial, Object3D } from "three";
import { FactionColor } from "../../models/game.model.ts";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loader = new GLTFLoader();

const texturesMap = new Map();

import glb1Src from "./models/Army-1.glb";
import glb5Src from "./models/Army-5.glb";
import glb10Src from "./models/Army-10.glb";
import glb25Src from "./models/Army-25.glb";

export const modelsMap = new Map();
modelsMap.set(25, glb25Src);
modelsMap.set(10, glb10Src);
modelsMap.set(5, glb5Src);
modelsMap.set(1, glb1Src);

export const scaleMap = new Map();
scaleMap.set(25, 0.1);
scaleMap.set(10, 0.075);
scaleMap.set(5, 0.06);
scaleMap.set(1, 0.05);

export interface ArmyUnitProps extends Object3DProps {
  armyCount: number;
  faction: number;
}

export const ArmyUnit: FC<ArmyUnitProps> = ({
  armyCount,
  faction,
  ...props
}) => {
  const [mesh, setMesh] = useState<Object3D>();
  const [scale, setScale] = useState<number>(1);

  const ref = useRef<Object3D>(new Object3D());

  useEffect(() => {
    const loadModel = async () => {
      const glbSrc = modelsMap.get(armyCount) || glb1Src;
      setScale(scaleMap.get(armyCount) || 1);

      const model = await loader.loadAsync(glbSrc);

      if (!texturesMap.has(faction)) {
        const newTexture = new MeshBasicMaterial();
        newTexture.color.set(FactionColor[faction]);
        newTexture.opacity = 0.75;
        newTexture.transparent = true;
        texturesMap.set(faction, newTexture);
      }

      const texture = texturesMap.get(faction);
      model.scene.traverse((child) => {
        if (!(child instanceof Mesh)) {
          return;
        }

        child.material = texture;
      });

      setMesh(model.scene);
    };

    loadModel();
  }, [armyCount, faction, ref.current]);

  return (
    <object3D {...props}>
      {mesh && (
        <primitive object={mesh} position={[0.2, -0.02, 0.15]} scale={scale} />
      )}
    </object3D>
  );
};
