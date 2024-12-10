import React from "react";

const Flag = React.forwardRef((_, ref) => {
  return (
    <group ref={ref}>
      <mesh>
        <cylinderGeometry args={[0.005, 0.005, 0.5, 20]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );
});

export default Flag;
