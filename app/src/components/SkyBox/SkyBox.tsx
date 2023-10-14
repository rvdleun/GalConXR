import { BackSide } from 'three';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import background from '../../assets/images/skybox.jpg';

export const SkyBox = () => {
    const map = useLoader(TextureLoader, background);

    return (
        <mesh>
            <sphereGeometry args={[500, 500, 500]} />
            <meshBasicMaterial side={BackSide} map={map} />
        </mesh>
    )
}
