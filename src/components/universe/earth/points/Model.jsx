import React from 'react'

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import useMainStore from '../../../../store/useMainStore'
import gsap from 'gsap'
import {PointContext} from "./Point";

const Model = React.forwardRef((_, ref) => {

  const {carouselRef, code, model:{ altitude, fullScale, adjustment }, removeFocus} = React.useContext(PointContext)

  let position = [0, altitude, 0]
  if (adjustment) {
    position = position.map((e, index) => e + adjustment[index])
  }

  const scale = Array(3).fill(fullScale)

  const setFocusTarget = useMainStore.useSetFocusTarget()

  const gltf = useLoader(GLTFLoader, `/models/${code.toUpperCase()}.glb`)

  Object.keys(gltf.nodes).forEach(nodeKey => {
    if (gltf.nodes[nodeKey].isMesh) {
      gltf.nodes[nodeKey].castShadow = true
      gltf.nodes[nodeKey].receiveShadow = true
    }
  })

  const onModelClick = () => {
    removeFocus()
    setFocusTarget(null)
    gsap.to(carouselRef.current.scale, {duration: .2, x: 0, y: 0, z: 0})
  }

  return (
    <group ref={ref}>
      <primitive object={gltf.scene} position={position} scale={scale} onClick={onModelClick}/>
    </group>
  )
})

export default Model