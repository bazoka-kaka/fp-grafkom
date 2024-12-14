import React from "react";
import * as THREE from 'three';
import {useLoader} from "@react-three/fiber";
import {PointContext} from "../Point";
import FlagCloth from "./FlagCloth";

const Flag = React.forwardRef((_, ref) => {
  const {countryCode} = React.useContext(PointContext)
  const map = useLoader(THREE.TextureLoader, `https://flagcdn.com/w320/${countryCode}.png`)
  return (
    <group ref={ref}>
      <mesh>
        <cylinderGeometry args={[.005, .005, .5, 20]}/>
        <meshStandardMaterial color='#FFFFFF'/>
      </mesh>
      <FlagCloth map={map} />
    </group>
  )
})

export default Flag