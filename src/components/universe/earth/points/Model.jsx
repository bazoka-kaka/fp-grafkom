import React from 'react'

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import useMainStore from '../../../../store/useMainStore'
import gsap from 'gsap'
import {PointContext} from "./Point";

const Model = React.forwardRef((_, ref) => {

  const {carouselRef, modelName, altitude, fullModelScale, removeFocus} = React.useContext(PointContext)

  const scale = Array(3).fill(fullModelScale)

  const setFocusTarget = useMainStore.useSetFocusTarget()

  const gltf = useLoader(GLTFLoader, `/models/${modelName}`)

  const onModelClick = () => {
    removeFocus()
    setFocusTarget(null)
    gsap.to(carouselRef.current.scale, {duration: .2, x: 0, y: 0, z: 0})
  }

  return (
    <group ref={ref}>
      <primitive object={gltf.scene} position={[0,altitude,0]} scale={scale} onClick={onModelClick}/>
    </group>
  )
})

export default Model