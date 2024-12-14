import React from "react";
import gsap from "gsap";
import Model from "./Model";
import { PointContext } from "./Point";
import Flag from "./flag";
import Navigation from "./navigation";
import Population from "./population"; // Import Population component

export const CarouselContext = React.createContext();
const Carousel = () => {
  const { carouselRef: ref, position, rotation } = React.useContext(PointContext);
  const fixedPosition = position.map((e) => e * 3);

  const objects = [
    {
      component: Model,
      ref: React.useRef(),
    },
    {
      component: Flag,
      ref: React.useRef(),
    },
    {
      component: Population, // Add Population graph here
      ref: React.useRef(),
    },
  ];

  const [shownObject, setShownObject] = React.useState(0);

  React.useEffect(() => {
    objects.forEach((object, index) => {
      const scale = Array(3).fill(index === shownObject ? 1 : 0); // Correct scaling
      gsap.to(object.ref.current.scale, {
        duration: 0.2,
        x: scale[0],
        y: scale[1],
        z: scale[2],
      });
    });
  }, [shownObject]);

  return (
    <CarouselContext.Provider value={{ len: objects.length, setShownObject }}>
      <group
        ref={ref}
        position={fixedPosition}
        rotation={[...rotation, "YXZ"]}
        scale={Array(3).fill(0)}
      >
        <Navigation />
        {objects.map((Object, index) => (
          <Object.component ref={Object.ref} key={index} />
        ))}
      </group>
    </CarouselContext.Provider>
  );
};

export default Carousel;
