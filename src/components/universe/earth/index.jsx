import React from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'


import EarthCityLight from './EarthCityLight'
import {degToRad, getDegreeDistance} from '../../../lib'
import Points from './points'

const Earth = () => {
  //#region  //*=========== Set Material Configuration ===========
  const map = useLoader(THREE.TextureLoader, 'textures/earth_no_ice_clouds_mts_8k.jpg')
  //#endregion  //*======== Set Material Configuration ===========

  //#region  //*=========== Set Geometry Configuration ===========
  const [rotation, setRotation] = React.useState([0, 0, 0])
  const radius = 3
  const widthSegments = 64
  const heightSegments = 64
  const phiStart = -0.5 * Math.PI
  //#endregion  //*======== Set Geometry Configuration ===========

  useFrame(() => {
    const degree = getDegreeDistance()

    setRotation([0, degToRad(degree), 0])
  })
  
  return (
    <group rotation={rotation}>
      <mesh position={[0,0,0]}>
        <sphereGeometry args={[radius, widthSegments, heightSegments, phiStart]}/>
        <meshStandardMaterial
          map={map}
          side={THREE.DoubleSide}
        />
      </mesh>
      <EarthCityLight/>
      <Points />
    </group>
  )
}

export default Earth