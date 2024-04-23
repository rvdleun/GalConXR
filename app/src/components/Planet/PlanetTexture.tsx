import Alpine from './textures/Alpine.jpg';
import Clouds1 from './textures/Clouds4.jpg';
import Clouds2 from './textures/Clouds4.jpg';
import Clouds3 from './textures/Clouds4.jpg';
import Clouds4 from './textures/Clouds4.jpg';
import Gaseous1 from './textures/Gaseous1.jpg';
import Gaseous2 from './textures/Gaseous2.jpg';
import Gaseous3 from './textures/Gaseous3.jpg';
import Gaseous4 from './textures/Gaseous4.jpg';
import Icy from './textures/Icy.jpg';
import Martian from './textures/Martian.jpg';
import Savannah from './textures/Savannah.jpg';
import Swamp from './textures/Swamp.jpg';
import Terrestrial1 from './textures/Terrestrial1.jpg';
import Terrestrial2 from './textures/Terrestrial2.jpg';
import Terrestrial3 from './textures/Terrestrial3.jpg';
import Terrestrial4 from './textures/Terrestrial4.jpg';
import Tropical from './textures/Tropical.jpg';
import Venusian from './textures/Venusian.jpg';
import Volcanic from './textures/Volcanic.jpg';

import {TextureLoader} from "three";
import {useRef} from "react";

const loader = new TextureLoader();
const textures = [Alpine, Clouds1, Clouds2, Clouds3, Clouds4, Gaseous1, Gaseous2, Gaseous3, Gaseous4, Icy, Martian, Savannah, Swamp, Terrestrial1, Terrestrial2, Terrestrial3, Terrestrial4, Tropical, Venusian, Volcanic].map((texture) => loader.load(texture));

interface PlanetTextureProps {
    isSelected?: boolean;
}

export const PlanetTexture = ({ isSelected }: PlanetTextureProps) => {
    const index = useRef(Math.floor(Math.random() * textures.length));

    return (
        <meshBasicMaterial color={isSelected ? '0xffffff' : '0xff0000'} aoMapIntensity={10} transparent opacity={.75} map={!isSelected ? textures[index.current] : undefined} />
    );
}