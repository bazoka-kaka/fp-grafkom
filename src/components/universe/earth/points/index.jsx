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
        <Point
          key={index}
          latLon={point.coordinate}
          rad={3}
          ref={pointRefs[index]}
          fullModelScale={point.fullModelScale}
        >
          <Model
            rad={point.modelRad}
            modelName={point.modelName}
            ref={modelRefs[index]}
          />
        </Point>
      ))}
    </group>
  );
}

export default Points