import React from 'react'

import points from '../../../../constant/points'
import Point from './Point'
import Carousel from "./Carousel";


const Points = () => {
  return (
    <group>
      {points.map((point, index) => (
        <Point key={index} rad={3} {...point}>
          <Carousel />
        </Point>
      ))}
    </group>
  );
};

export default Points