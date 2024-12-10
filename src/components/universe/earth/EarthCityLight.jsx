import React from 'react'

import { useLoader } from '@react-three/fiber'
import { Plane, TextureLoader, Matrix4, Vector3, Euler } from 'three'

import { degToRad, getDegreeDistance } from '../../../lib'
import useMainStore from '../../../store/useMainStore'

const EarthCityLight = () => {
  const focusTarget = useMainStore.useFocusTarget()

  const emissiveMap = useLoader(TextureLoader, 'textures/earth_night_8k.jpg')

  const earthRotation = getDegreeDistance()

  let totalYRotation = 0
  if (focusTarget!== null) {
    totalYRotation = -(focusTarget.rotation.y + degToRad(earthRotation))
  }
  totalYRotation < -Math.PI && (totalYRotation =  totalYRotation + 2 * Math.PI)


  const planeRotation = new Matrix4()

  planeRotation.makeRotationFromEuler(
    focusTarget !== null
        ? new Euler(-focusTarget.rotation.x,totalYRotation, -focusTarget.rotation.z, 'ZXY')
      : new Euler(0,0,0)
  )

  const plane = new Plane(new Vector3(0,0,1), 0.15)
  plane.applyMatrix4(planeRotation)

  //#region  //*=========== Set Geometry Configuration ===========
  const radius = 3
  const widthSegments = 64
  const heightSegments = 64
  const phiStart = -0.5 * Math.PI
  //#endregion  //*======== Set Geometry Configuration ===========

  return (
    <>
      <mesh
        position={[0,0,0]}
      >
        <sphereGeometry args={[radius, widthSegments, heightSegments, phiStart]}/>
        <meshStandardMaterial
          transparent
          emissive='#FFFFFF'
          emissiveIntensity={1}
          alphaMap={emissiveMap}
          emissiveMap={emissiveMap}
          clippingPlanes={[plane]}
        />
      </mesh>
    </>
  )
}

export default EarthCityLight