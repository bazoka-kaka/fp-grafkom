import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

import EarthCityLight from './EarthCityLight';
import { degToRad, getDegreeDistance } from '../../../lib';
import Points from './points';

const Earth = () => {
  //#region  //*=========== Set Material Configuration ===========
  const map = useLoader(THREE.TextureLoader, 'textures/earth_no_ice_clouds_mts_8k.jpg');
  //#endregion  //*======== Set Material Configuration ===========

  //#region  //*=========== Set Geometry Configuration ===========
  const radius = 3;
  const widthSegments = 64;
  const heightSegments = 64;
  const phiStart = -0.5 * Math.PI;
  //#endregion  //*======== Set Geometry Configuration ===========

  const ref = useRef();

  // Gunakan useFrame untuk pembaruan rotasi real-time
  useFrame(() => {
    if (ref.current) {
      const targetRotation = degToRad(getDegreeDistance()); // Hitung rotasi target berdasarkan waktu
      gsap.to(ref.current.rotation, { duration: 0.1, y: targetRotation }); // Animasi menggunakan GSAP
    }
  });

  return (
    <group ref={ref}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[radius, widthSegments, heightSegments, phiStart]} />
        <meshStandardMaterial map={map} side={THREE.DoubleSide} />
      </mesh>
      <EarthCityLight />
      <Points />
    </group>
  );
};

export default Earth;
