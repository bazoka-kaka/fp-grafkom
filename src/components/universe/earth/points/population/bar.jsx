import React from "react";
import { Text } from "@react-three/drei"; // Import Text dari drei untuk teks centered otomatis

const Bar = ({ year, x, pop, height, color }) => {
  const formattedPopulation = new Intl.NumberFormat("en-id").format(pop);

  return (
    <group>
      {/* Label Tahun dan Populasi */}
      <group position={[x, height + 0.05, 0]} name="label-group">
        {/* Tahun */}
        <Text
          position={[0, -0.01, 0]}
          fontSize={0.015}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          {year}
        </Text>
        {/* Populasi */}
        <Text
          position={[0, -0.03, 0]}
          fontSize={0.010}
          color="#AAAAAA"
          anchorX="center"
          anchorY="middle"
        >
          {formattedPopulation}
        </Text>
      </group>
      {/* Bar */}
      <mesh position={[x, height / 2, 0]} castShadow>
        <boxGeometry args={[0.03, height, 0.03]} /> {/* Ukuran bar lebih kecil */}
        <meshStandardMaterial color={color} /> {/* Warna bar */}
      </mesh>
    </group>
  );
};

export default Bar;
