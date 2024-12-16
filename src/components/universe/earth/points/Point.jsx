import React  from 'react'

import gsap from 'gsap'

import { latLonTo3dPosition, latLonTo3dRotation } from '../../../../lib'
import useMainStore from '../../../../store/useMainStore'

export const PointContext = React.createContext()
const Point = ({ coordinate: [lat, lon], rad, children, isFocus, focusFn, removeFocus, ...rest }) => {
  const setFocusTarget = useMainStore.useSetFocusTarget()

  const ref = React.useRef()
  const carouselRef = React.useRef()

  const position = latLonTo3dPosition(lat, lon)
  const pointPosition = position.map(e => e * rad)
  const rotation = latLonTo3dRotation(lat, lon)

  React.useEffect(() => {
    if (ref.current) {
      ref.current.rotation.set(...rotation,'YXZ')
    }
  }, [ref.current])

  const onClick = () => {
    focusFn()
    setFocusTarget(carouselRef.current)
    gsap.to(carouselRef.current.scale, {duration: .2, x: 1, y: 1, z: 1})
  }

  return (
    <PointContext.Provider value={{
      carouselRef, position, rotation, isFocus, removeFocus, ...rest}}>
      <mesh ref={ref} position={pointPosition}
            onClick={onClick}
      >
        <cylinderGeometry
          args={[.03, .03, .01, 20]}
        />
        <meshStandardMaterial
          color='#FFFFFF'
        />
      </mesh>
      { children }
    </PointContext.Provider>
  )
}

export default Point