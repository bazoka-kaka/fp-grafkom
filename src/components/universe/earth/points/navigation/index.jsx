import React from "react";
import Prev from "./Prev";
import Next from "./Next";
import { ControlsContext } from "../../../../../App";
import { useFrame } from "@react-three/fiber";
const Navigation = () => {
  const { controls } = React.useContext(ControlsContext);
  const [rotation, setRotation] = React.useState([0, 0, 0]);
  useFrame(() => {
    const rotation = controls.current.getAzimuthalAngle();
    setRotation([0, rotation, 0]);
  });
  return (
    <group rotation={rotation}>
      <Prev />
      <Next />
    </group>
  );
};
export default Navigation;
