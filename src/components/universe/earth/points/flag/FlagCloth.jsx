import React, { useRef, useState, useEffect } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js'
import Cloth from "../../../../../lib/cloth";
import * as THREE from "three";

extend({ParametricGeometry})


const TIME_STEP = 18 / 1000;

const FlagCloth = ({map}) => {

  const [cloth, setCloth] = useState(null);
  useEffect(() => {
    setCloth(new Cloth(12, 9));
  }, []);

  const mesh = useRef();
  const geometry = useRef();

  const clock = new THREE.Clock()
  clock.start()


  useFrame(() => {
    if (cloth && geometry.current) {
      cloth.update(TIME_STEP, geometry.current);

      const newVertices = cloth.getParticles();

      geometry.current.setAttribute('position', new THREE.BufferAttribute(new Float32Array(newVertices), 3))

      geometry.current.computeVertexNormals();
      geometry.current.computeBoundingBox();
      geometry.current.computeBoundingSphere();

      geometry.current.attributes.normal.needsUpdate = true;
      geometry.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[-0.08,0.19,0]}>
      {cloth && <mesh ref={mesh} scale={[.0005,.0005,.0005]}>
        <parametricGeometry
          attach='geometry'
          args={cloth.toGeometryArgs()}
          ref={geometry}
          dynamic={true}
        />
        <meshStandardMaterial
          side={THREE.DoubleSide}
          map={map}
        />
      </mesh>}
      {cloth &&
        cloth.particles.map((p, i) => (
          <mesh key={i} position={p.position}>
            <boxBufferGeometry attach="geometry" args={Array(3).fill(0.05)} />
            <meshStandardMaterial attach="material" color={'orange'} side={THREE.DoubleSide}/>
          </mesh>
        ))
      }
    </group>
  )
}

export default FlagCloth