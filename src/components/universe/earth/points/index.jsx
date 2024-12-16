import React from 'react'

import points from '../../../../constant/points'
import Point from './Point'
import Carousel from "./Carousel";

const Points = () => {
  const [focusedIndex, setFocusedIndex] = React.useState(null)
  return (
    <group>
      {points.map((point, index) => (
          <Point
            key={index}
            rad={3}
            focusFn={() => setFocusedIndex(index)}
            removeFocus={() => setFocusedIndex(null)}
            isFocus={focusedIndex === index}
            {...point}
          >
            <Carousel/>
          </Point>
      ))}
    </group>
  )
}

export default Points