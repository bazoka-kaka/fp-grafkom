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
  // const [active, setActive] = useState(false)
  const ref = React.useRef()
  const carouselRef = React.useRef()
  const [hover, setHover] = React.useState(false)
  // let hoverState = false

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
    // alert('onClickStatus is ' + onClickStatus) // Status is false
    // onClickStatus = !onClickStatus
    // alert('onClickStatus is ' + onClickStatus) // Status is true
    // if (onClickStatus) {alert('onClickStatus is ' + onClickStatus)}
    alert('isFocus : ' + isFocus)
  }

  const onHoverIn = () => {
    // hoverState = !hoverState
    setHover(true)
    // console.log('hovered in ' + hoverState)
  }

  const onHoverOut = () => {
    // hoverState = !hoverState
    setHover(false)
    // console.log('hovered out ' + hoverState)
  }

  return (
    <PointContext.Provider value={{
      ref, code, carouselRef, position: pointPosition, rotation, isFocus, removeFocus, ...rest}}>
      <mesh ref={ref} position={pointPosition}
            onClick={onClick}
            onPointerOver={onHoverIn}
            onPointerOut={onHoverOut}
      >
        <cylinderGeometry
          args={[.03, .03, .01, 20]}
        />
        <meshBasicMaterial
          color={hover === true ? '#FF0000' : '#FFFFFF'}
          // opacity='0.0'
          // transparent={isFocus === true ? true : false}
          visible = {!isFocus}

        />
      </mesh>
      { children }
    </PointContext.Provider>
  )
}

export default Point