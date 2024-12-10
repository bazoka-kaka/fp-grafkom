import React from 'react'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import styles from './App.module.css'
import Universe from './components/universe'


//#region  //*=========== Create Context Provider That Contains Orbit Control Reference ===========
export const ControlsContext = React.createContext()
const ControlContainer = ({ children }) => {
  // Orbit control reference to be used in the children
  const controls = React.useRef()

  //#region  //*=========== Default View Configuration ===========
  const maxDistance = 8
  const minDistance = 3.1
  //#endregion  //*======== Default View Configuration ===========

  return (
    <ControlsContext.Provider value={{ controls }}>
      <OrbitControls
        maxDistance={maxDistance}
        minDistance={minDistance}
        enablePan={false}
        ref={controls}/>
      {children}
    </ControlsContext.Provider>
  )
}
//#endregion  //*======== Create Context Provider That Contains Orbit Control Reference ===========


//#region  //*=========== Main Application ===========
const App = () => {
  return (
    <div className={styles.container}>
      <Canvas className={styles.container} onCreated={state => {state.gl.localClippingEnabled = true}}>
        <ambientLight intensity={.05} />
        <ControlContainer>
          <Universe />
        </ControlContainer>
      </Canvas>
    </div>
  )
}
//#endregion  //*======== Main Application ===========

export default App