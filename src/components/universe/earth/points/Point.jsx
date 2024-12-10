import React  from 'react'

import gsap from 'gsap'

import { latLonTo3dPosition, latLonTo3dRotation } from '../../../../lib'
import useMainStore from '../../../../store/useMainStore'

export const PointContext = React.createContext()
const Point = ({ coordinate: [lat, lon], rad, children, ...rest }) => {
  const setFocusTarget = useMainStore.useSetFocusTarget();

  const ref = React.useRef();
  const carouselRef = React.useRef();

  const position = latLonTo3dPosition(lat, lon);
  const pointPosition = position.map((e) => e * rad);
  const rotation = latLonTo3dRotation(lat, lon);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.rotation.set(...rotation, "YXZ");
    }
  }, [ref.current]);

  const onClick = () => {
    setFocusTarget(carouselRef.current);
    gsap.to(carouselRef.current.scale, { duration: 0.2, x: 1, y: 1, z: 1 });
  };

  return (
    <PointContext.Provider
      value={{
        carouselRef,
        position,
        rotation,
        ...rest,
      }}
    >
      <mesh ref={ref} position={pointPosition} onClick={onClick}>
        <cylinderGeometry args={[0.03, 0.03, 0.01, 20]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      {children}
    </PointContext.Provider>
  );
};

export default Point