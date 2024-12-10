import React, { forwardRef } from 'react'

import gsap from 'gsap'

import { latLonTo3dPosition, latLonTo3dRotation } from '../../../../lib'
import useMainStore from '../../../../store/useMainStore'

export const PointContext = React.createContext();
const Point = forwardRef(({ latLon: [lat, lon], rad, children, fullModelScale }, ref) => {
  const setFocusTarget = useMainStore.useSetFocusTarget()

  const [modelRef, setModelRef] = React.useState(null)

  const position = latLonTo3dPosition(lat, lon)
  const pointPosition = position.map(e => e * rad)
  const rotation = latLonTo3dRotation(lat, lon)

  React.useEffect(() => {
    if (ref.current) {
      ref.current.rotation.set(...rotation,'YXZ')
    }
  }, [ref.current])

  const onClick = () => {
    setFocusTarget(modelRef.current)
    gsap.to(modelRef.current.scale, {duration: .2, x: fullModelScale, y: fullModelScale, z: fullModelScale})
  }

  return (
    <PointContext.Provider value={{ setModelRef, position, rotation }}>
      <mesh ref={ref} position={pointPosition} onClick={onClick}>
        <cylinderGeometry args={[0.03, 0.03, 0.01, 20]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      {children}
    </PointContext.Provider>
  );
})

export default Point