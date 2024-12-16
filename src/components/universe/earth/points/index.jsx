import React from 'react'

import points from '../../../../constant/points'
import Point from './Point'
import Carousel from "./Carousel";

const Points = () => {
  const [focusedIndex, setFocusedIndex] = React.useState(null)
  return (
    <group>
      {Object.keys(points).map((code, index) => (
          <Point
            key={code}
            code={code}
            focusFn={() => setFocusedIndex(index)}
            removeFocus={() => setFocusedIndex(null)}
            isFocus={focusedIndex === index}
            {...points[code]}
          >
            <Carousel/>
          </Point>
      ))}
    </group>
  )
}

export default Points