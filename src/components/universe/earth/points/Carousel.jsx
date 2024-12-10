import React from "react";

import Model from "./Model";
import { PointContext } from "./Point";

const Carousel = () => {
  const {
    carouselRef: ref,
    position,
    rotation,
  } = React.useContext(PointContext);
  const fixedPosition = position.map((e) => e * 3);

  return (
    <group
      ref={ref}
      position={fixedPosition}
      rotation={[...rotation, "YXZ"]}
      scale={[0, 0, 0]}
    >
      <Model />
    </group>
  );
};

export default Carousel;
