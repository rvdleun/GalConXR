import { Object3DProps } from '@react-three/fiber';
import { FC, useEffect, useRef, useState } from 'react';

import { Gltf } from '@react-three/drei';
import { Mesh, MeshBasicMaterial, Object3D } from 'three';
import { FactionColor } from '../../models/game.model.ts';

const texturesMap = new Map();

import glb1Src from './models/Army-1.glb';
import glb5Src from './models/Army-5.glb';
import glb10Src from './models/Army-10.glb';
import glb25Src from './models/Army-25.glb';

export const modelsMap = new Map();
modelsMap.set(25, glb25Src);
modelsMap.set(10, glb10Src);
modelsMap.set(5, glb5Src);
modelsMap.set(1, glb1Src);

export interface ArmyUnitProps extends Object3DProps {
    armyCount: number;
    faction: number;
}

export const ArmyUnit: FC<ArmyUnitProps> = ({ armyCount, faction, ...props }) => {
    const glbSrc = modelsMap.get(armyCount) || glb1Src;
    const ref = useRef<Object3D>(new Object3D());

    useEffect(() => {
        if (!FactionColor[faction]) {
            return;
        }

        if (!texturesMap.has(faction)) {
            const newTexture = new MeshBasicMaterial();
            newTexture.color.set(FactionColor[faction]);
            newTexture.opacity = 0.75;
            newTexture.transparent = true;
            texturesMap.set(faction, newTexture);
        }

        const texture = texturesMap.get(faction);
        ref.current.traverse((child) => {
            if (!(child instanceof Mesh)) {
                return;
            }

            child.material = texture;
        });
    }, [faction, ref.current]);

    return (
        <object3D {...props}>
            <Gltf ref={ref} position={[2, -.2, 1.5]} src={glbSrc} />
        </object3D>
    );
}
