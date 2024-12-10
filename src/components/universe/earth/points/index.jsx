import React from 'react'

import points from '../../../../constant/points'
import Point from './Point'
import Model from './Model'


const Points = () => {
  const pointRefs = points.map(() => React.useRef())
  const modelRefs = points.map(() => React.useRef())

  return (
    <group>
      {points.map((point, index) => (
        <Point key={index} rad={3} ref={pointRefs[index]} {...point}>
          <group>
            <Model ref={modelRefs[index]} />
          </group>
        </Point>
      ))}
    </group>
  );
}

export default Points