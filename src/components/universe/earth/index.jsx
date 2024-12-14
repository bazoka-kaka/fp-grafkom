import React, {useRef} from 'react'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'


import EarthCityLight from './EarthCityLight'
import {degToRad, getDegreeDistance} from '../../../lib'
import Points from './points'

const Earth = () => {
  //#region  //*=========== Set Material Configuration ===========
  const map = useLoader(THREE.TextureLoader, 'textures/earth_no_ice_clouds_mts_8k.jpg')
  //#endregion  //*======== Set Material Configuration ===========

  //#region  //*=========== Set Geometry Configuration ===========
  const radius = 3
  const widthSegments = 64
  const heightSegments = 64
  const phiStart = -0.5 * Math.PI
  //#endregion  //*======== Set Geometry Configuration ===========

  const ref = useRef()

  React.useEffect(() => {
    if (ref.current) {
      //#region  //*=========== Update Earth Rotation Every Minute ===========
      gsap.to(ref.current.rotation, {duration: .1, y: degToRad(getDegreeDistance())})
      setInterval(() => {
        gsap.to(ref.current.rotation, {duration: .1, y: degToRad(getDegreeDistance())})
      }, 60 * 1000)
      //#endregion  //*======== Update Earth Rotation Every Minute ===========
    }
  }, [ref.current])
  
  return (
    <group ref={ref}>
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