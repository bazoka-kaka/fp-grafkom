import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const Background = () => {
  //#region  //*=========== Set Material Configuration ===========
  const map = useLoader(THREE.TextureLoader, 'textures/galaxy_star_field.png')
  //#endregion  //*======== Set Material Configuration ===========

  //#region  //*=========== Set Geometry Configuration ===========
  const radius = 300
  const widthSegments = 64
  const heightSegments = 64
  //#endregion  //*======== Set Geometry Configuration ===========

  return (
    <mesh>
      <sphereGeometry args={[radius, widthSegments, heightSegments]}/>
      <meshStandardMaterial
        map={map}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

export default Background
