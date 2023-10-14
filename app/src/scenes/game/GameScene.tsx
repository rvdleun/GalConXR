import { SkyBox } from "../../components/SkyBox/SkyBox.tsx";

export const GameScene = () => {
  return (
    <object3D>
      <ambientLight />
      <SkyBox />
    </object3D>
  );
};
