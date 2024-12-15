import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useLoader, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef, useEffect } from "react";
import { Layers } from "three";

const Sun = ({ position = [0, 0, -200], radius = 20 }) => {
  const sunRef = useRef();

  // Load the Sun texture
  const sunMap = useLoader(TextureLoader, "textures/sun.png");

  // Sun properties
  const widthSegments = 64;
  const heightSegments = 64;
  const BLOOM_LAYER = 1;

  useEffect(() => {
    if (sunRef.current) {
      sunRef.current.layers.enable(BLOOM_LAYER);
    }
  }, [sunRef]);

  // Add rotation to the Sun
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005; // Rotate Sun on Y-axis
    }
  });

  return (
    <group>
      {/* Add point light to illuminate nearby objects like Earth */}
      <pointLight position={position} intensity={5} distance={500} decay={2} />

      {/* Sun Mesh */}
      <mesh ref={sunRef} position={position}>
        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
        <meshStandardMaterial
          map={sunMap} // Apply Sun texture
          emissive="#FFA500" // Glow effect color (orange)
          emissiveIntensity={0.5} // Glow intensity
        />
      </mesh>
    </group>
  );
};

const SunWithGlow = ({ position, radius }) => {
  return (
    <>
      {/* The Sun */}
      <Sun position={position} radius={radius} />

      {/* Add the Bloom Effect */}
      <EffectComposer>
        <Bloom
          intensity={1.5} // Glow intensity
          luminanceThreshold={0.2} // Brightness threshold for the glow
          luminanceSmoothing={0.9} // Smooth transition to glow
          layers={1} // Only apply bloom to objects in layer 1
        />
      </EffectComposer>
    </>
  );
};

export default Sun;
