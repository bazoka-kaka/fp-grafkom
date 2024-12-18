import React  from 'react'

import gsap from 'gsap'

import { latLonTo3dPosition, latLonTo3dRotation } from '../../../../lib'
import useMainStore from '../../../../store/useMainStore'
import {getCentralPoint} from "../../../../lib/api";

export const PointContext = React.createContext()
const Point = ({ code, coordinate, rad = 3, children, isFocus, focusFn, removeFocus, ...rest }) => {
  const setFocusTarget = useMainStore.useSetFocusTarget()
  const [pointPosition, setPointPosition] = React.useState([0,0,0])
  const [rotation, setRotation] = React.useState([0,0,0])
  const ref = React.useRef()
  const carouselRef = React.useRef()

  const setupData = async () => {
    const centralPoint = (await getCentralPoint(code)).reverse()
    setPointPosition(latLonTo3dPosition(...centralPoint, rad))
    setRotation(latLonTo3dRotation(...centralPoint))
  }

  React.useEffect(() => {
    setupData()
  }, [])

  React.useEffect(() => {
    if (ref.current) {
      ref.current.rotation.set(...rotation,'YXZ')
    }
  }, [ref.current, rotation])

  const onClick = () => {
    focusFn()
    setFocusTarget(carouselRef.current)
    gsap.to(carouselRef.current.scale, {duration: .2, x: 1, y: 1, z: 1})
  }

  return (
    <PointContext.Provider value={{
      ref, code, carouselRef, position: pointPosition, rotation, isFocus, removeFocus, ...rest}}>
      <mesh ref={ref} position={pointPosition}
            onClick={onClick}
      >
        <cylinderGeometry
          args={[.03, .03, .01, 20]}
        />
        <meshBasicMaterial
          color='#FFFFFF'
        />
      </mesh>
      { children }
    </PointContext.Provider>
  )
}

export default Point