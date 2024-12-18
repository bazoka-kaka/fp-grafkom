import React from "react";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { extend } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

import inter from '../../../../../assets/fonts/Inter_Regular.json'


extend({TextGeometry})

const Bar = ({year, x, pop, height, color}) => {
  const font = new FontLoader().parse(inter)
  const formattedPopulation = new Intl.NumberFormat('en-id').format(pop)
  return (
    <group>
      <group position={[x - 0.015, height / 2 + 0.03, 0]}>
        <mesh castShadow>
          <textGeometry args={[`${year}`, {font, size: .01, height: .002}]}/>
        </mesh>
        <mesh castShadow position={[0,-.011,0]}>
          <textGeometry args={[formattedPopulation, {font, size: .005, height: .002}]}/>
        </mesh>
      </group>
      <mesh position={[x,0,0]} castShadow>
        <boxGeometry args={[.03, height,.03]}/>
        <meshStandardMaterial color={color}/>
      </mesh>
    </group>
  )
}

export default Bar