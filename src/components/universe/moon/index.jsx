import { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useFrame, useLoader } from "@react-three/fiber";
import { normalize } from "lib";

const Moon = () => {
  const moonRef = useRef();
  const [isXRevolutionForward, setIsXRevolutionForward] = useState(true);
  const [currentRotation, setCurrentRotation] = useState([0, 0, 0]);
  const moonTexture = useLoader(TextureLoader, "textures/moon.jpg");  // Single moon texture

  // Constants for moon movement
  const moonOrbitDurationInSecs = 27.3 * 24 * 60 * 60;  // seconds in a moon's complete orbit
  const xAxisRevolutionSpeed = 0.3;  // Speed of moon's revolution along x-axis
  const yAxisRevolutionSpeed = 6.5;  // Speed of moon's revolution along y-axis
  const zAxisRotationSpeed = 6.25 / (24 * 60 * 60);  // Speed of moon's rotation along z-axis

  const moonRadius = 0.75;
  const moonPosition = [0, 0, -10];  // Position in 3D space
  const geometrySegments = 64;  // Quality of the sphere geometry

  useEffect(() => {
    const currentDay = new Date().getDate();
    let adjustedXRotation = null;
    let adjustedYRotation = null;

    // Dynamically calculate moon's rotation based on the current date
    if (currentDay <= 15) {
      adjustedXRotation = (normalize(currentDay, 15, 1) - 1) * xAxisRevolutionSpeed * -1;
      adjustedYRotation = (normalize(currentDay, 15, 1) - 1) * (yAxisRevolutionSpeed / 2) * -1;
    } else {
      adjustedXRotation = (normalize(currentDay, 31, 15)) * xAxisRevolutionSpeed;
      adjustedYRotation = (normalize(currentDay, 31, 15)) * (yAxisRevolutionSpeed / 2);
    }

    setCurrentRotation([adjustedXRotation, adjustedYRotation, 0]);
  }, []);

  useFrame(() => {
    // Control the moon's revolution speed
    if (moonRef.current.rotation.x >= Math.abs(xAxisRevolutionSpeed)) {
      setIsXRevolutionForward(!isXRevolutionForward);
    }

    if (isXRevolutionForward) {
      moonRef.current.rotation.x += xAxisRevolutionSpeed / moonOrbitDurationInSecs;
    } else {
      moonRef.current.rotation.x -= xAxisRevolutionSpeed / moonOrbitDurationInSecs;
    }

    // Adjust moon's rotation around other axes
    moonRef.current.rotation.y += yAxisRevolutionSpeed / moonOrbitDurationInSecs;
    moonRef.current.rotation.z += zAxisRotationSpeed;
  });

  return (
    <group ref={moonRef} rotation={currentRotation}>
      <mesh position={moonPosition}>
        <sphereGeometry args={[moonRadius, geometrySegments, geometrySegments]} />
        <meshPhongMaterial map={moonTexture} />
      </mesh>
    </group>
  );
};

export default Moon;
