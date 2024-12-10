import React from "react";
import { degToRad } from "../../../../../lib";
import { CarouselContext } from "../Carousel";
const Next = () => {
  const { len, setShownObject } = React.useContext(CarouselContext);
  const onClick = () => {
    setShownObject((state) => (state + 1) % len);
  };
  return (
    <mesh
      position={[0.2, 0.2, 0]}
      rotation={[0, 0, degToRad(-90)]}
      onClick={onClick}
    >
      <coneGeometry args={[0.01, 0.02, 32]} />
      <meshStandardMaterial color="#FFFFFF" />
    </mesh>
  );
};
export default Next;
