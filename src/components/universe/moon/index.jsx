import { useRef } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useFrame, useLoader } from "@react-three/fiber";
import { normalize } from "../../../lib";

const Moon = ({ earthPosition = [0, 0, 0], orbitRadius = 15 }) => {
  const ref = useRef();

  // Load the moon texture
  const moonMap = useLoader(TextureLoader, "textures/moon.jpg");

  // Moon properties (realistic size relative to Earth)
  const radius = 1; // Moon radius relative to Earth
  const widthSegments = 32;
  const heightSegments = 32;

  // Moon revolution duration in seconds
  const moonRevolutionDuration = 27.3 * 24 * 60 * 60; // 27.3 days in seconds

  // Frame-by-frame updates
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    // Calculate moon's position based on revolution
    const angle = Math.PI / 2 + (elapsedTime / moonRevolutionDuration) * 2 * Math.PI;
    const moonX = earthPosition[0] + orbitRadius * Math.cos(angle);
    const moonZ = earthPosition[2] + orbitRadius * Math.sin(angle);

    if (ref.current) {
      ref.current.position.set(moonX, earthPosition[1], moonZ); // Update moon position
      ref.current.rotation.y += 0.01; // Add rotation to moon
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
        <meshStandardMaterial map={moonMap} />
      </mesh>
    </group>
  );
};

export default Moon;
