import React from 'react'

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import useMainStore from '../../../../store/useMainStore'
import gsap from 'gsap'
import { PointContext } from "./Point";

const Model = () => {
  const {
    carouselRef,
    modelRef: ref,
    modelName,
    altitude,
    fullModelScale,
  } = React.useContext(PointContext);

  const scale = Array(3).fill(fullModelScale);

  const setFocusTarget = useMainStore.useSetFocusTarget();

  const gltf = useLoader(GLTFLoader, `/models/${modelName}`);

  const onModelClick = () => {
    setFocusTarget(null);
    gsap.to(carouselRef.current.scale, { duration: 0.2, x: 0, y: 0, z: 0 });
  };

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      position={[0, altitude, 0]}
      scale={scale}
      onClick={onModelClick}
    />
  );
};

export default Model