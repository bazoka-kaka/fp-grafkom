import { useRef } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useLoader } from "@react-three/fiber";
import {
  EffectComposer,
  Selection,
  Select,
  SelectiveBloom,
} from "@react-three/postprocessing";

const Sun = () => {
  const sunMap = useLoader(TextureLoader, "textures/sun.jpg");

  //#region  //*=========== Set Material Configuration ===========
  const lightColor = "#FFFFFF";
  //#endregion  //*======== Set Material Configuration ===========

  //#region  //*=========== Set Geometry Configuration ===========
  const position = [0, 0, -200];
  const radius = 2;
  const widthSegments = 64;
  const heightSegments = 64;
  //#endregion  //*======== Set Geometry Configuration ===========

  const sunRef = useRef();

  return (
    <>
      <pointLight
        args={[lightColor, radius]}
        position={position}
        intensity={1}
        castShadow
      />

      <Selection>
        <EffectComposer autoclear={false}>
          <SelectiveBloom
            selection={sunRef}
            intensity={30}
            luminanceThreshold={0}
            luminanceSmoothing={0.4}
          />
        </EffectComposer>
        <Select enabled>
          <mesh ref={sunRef} position={position} receiveShadow={true}>
            <sphereGeometry args={[radius, widthSegments, heightSegments]} />
            <meshBasicMaterial map={sunMap} />
          </mesh>
        </Select>
      </Selection>
    </>
  );
};

export default Sun;