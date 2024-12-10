const Sun = () => {
  //#region  //*=========== Set Material Configuration ===========
  const lightColor = '#FFFFFF'
  //#endregion  //*======== Set Material Configuration ===========
  
  //#region  //*=========== Set Geometry Configuration ===========
  const position = [0, 0, -200]
  const radius = 2
  const widthSegments = 64
  const heightSegments = 64
  //#endregion  //*======== Set Geometry Configuration ===========

  return (
    <>
      <pointLight args={[lightColor, radius]} position={position} intensity={1}/>
      <mesh position={position}>
        <sphereGeometry args={[radius, widthSegments, heightSegments]}/>
        <meshStandardMaterial
          color={lightColor}
          emissive={lightColor}
        />
      </mesh>
    </>
  )
}

export default Sun