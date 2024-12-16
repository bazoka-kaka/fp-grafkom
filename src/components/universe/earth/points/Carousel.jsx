import React from "react";

import gsap from "gsap";

import Model from "./Model";
import {PointContext} from "./Point";
import Flag from "./flag";
import Navigation from "./navigation";
import Population from "./population";

export const CarouselContext = React.createContext()
const Carousel = () => {

  const {carouselRef: ref, position, rotation, isFocus} = React.useContext(PointContext)
  const fixedPosition = position.map(e => e * 3)

  const objects = [
    {
      component: Model,
      ref: React.useRef()
    },
    {
      component: Flag,
      ref: React.useRef()
    },
    {
      component: Population,
      ref: React.useRef()
    }
  ]

  const [shownObject, setShownObject] = React.useState(0)

  React.useEffect(() => {
    if (isFocus) {
      objects.forEach((object, index) => {
        const scale = Array(3).fill(index === shownObject)
        gsap.to(object.ref.current.scale, {duration: .2, x: scale[0], y: scale[1], z: scale[2]})
      })
    }
  }, [shownObject, isFocus])

  return (
    <CarouselContext.Provider value={{len: objects.length, setShownObject}}>
      <group ref={ref} position={fixedPosition} rotation={[...rotation, 'YXZ']} scale={Array(3).fill(0)} visible={isFocus}>
        <Navigation />
        {objects.map(Object => (
          <Object.component ref={Object.ref}/>
        ))}
      </group>
    </CarouselContext.Provider>
  )
}

export default Carousel