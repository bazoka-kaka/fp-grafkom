import React from 'react';

/**
 * Komponen Pencahayaan Matahari
 */
const SunLight = ({ position = [100, 0, 100], intensity = 2 }) => {
  return <directionalLight position={position} intensity={intensity} castShadow />;
};

export default SunLight;
