import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BackSide } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import background from './holodeck-pattern.jpg';
import { useRef } from 'react';
import * as TWEEN from '@tweenjs/tween.js';

const Environment = ({ children }) => {
    const map = useLoader(TextureLoader, background);

    useFrame(() => {
        TWEEN.update();
    });

    return                 <><OrbitControls />
    <mesh scale={[1050, 1050, 1050]}>
        <boxGeometry />
        <meshBasicMaterial map={map} side={BackSide} />
    </mesh>
    {children}</>

}

export const StoryBookCanvasWrapper = ({ children }) => {
    return (
        <div style={{ position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0 }}>
            <Canvas>
                <Environment>{ children }</Environment>
            </Canvas>
        </div>
    )
}
