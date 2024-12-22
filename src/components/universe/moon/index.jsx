import { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useFrame, useLoader } from "@react-three/fiber";
import { normalize } from "lib";

const Moon = () => {
  const ref = useRef();
  const [incrementX, setIncrementX] = useState(true);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const moonMap = useLoader(TextureLoader, "textures/moon.jpg");

  const moonRevolutionDuration = 27.3 * 24 * 60 * 60; // days * hours * minutes * seconds
  const xRevolutionRatio = 0.3;
  const yRevolutionRatio = 6.5;
  const zRotationRatio = 6.25 / 24 / 60 / 60; // ratio / hours / minutes / seconds

  const position = [0, 0, -10];
  const radius = 0.75;
  const widthSegments = 64;
  const heightSegments = 64;

  useEffect(() => {
    const currDate = new Date().getDate();

    // current X & Y ratio
    let normalizedX = null;
    let normalizedY = null;
    if (currDate <= 15) {
      normalizedX = (normalize(currDate, 15, 1) - 1) * xRevolutionRatio * -1;
      normalizedY =
        (normalize(currDate, 15, 1) - 1) * (yRevolutionRatio / 2) * -1;
    } else {
      normalizedX = (normalize(currDate, 31, 15)) * xRevolutionRatio;
      normalizedY = (normalize(currDate, 31, 15)) * (yRevolutionRatio / 2);
    }

    setRotation([normalizedX, normalizedY, 0]);
  }, []);

  useFrame(() => {
    if (ref.current.rotation.x >= Math.abs(xRevolutionRatio))
      setIncrementX(!incrementX);

    incrementX
      ? (ref.current.rotation.x += xRevolutionRatio / moonRevolutionDuration)
      : (ref.current.rotation.x -= xRevolutionRatio / moonRevolutionDuration);

    ref.current.rotation.y += yRevolutionRatio / moonRevolutionDuration;
    ref.current.rotation.z += zRotationRatio;
  });

  return (
    <group ref={ref} rotation={rotation}>
      <mesh position={position}>
        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
        <meshPhongMaterial map={moonMap} />
      </mesh>
    </group>
  );
};

export default Moon;
