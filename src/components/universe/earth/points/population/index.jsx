import React, { forwardRef, useState, useEffect } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import inter from "../../../../../fonts/Inter_Regular.json";
import Bar from "./bar";
import { Text } from "@react-three/drei"; // Import Text dari drei untuk teks centered otomatis
import { PointContext } from "../Point"; // Import context untuk mendapatkan `countryCode`

const Population = forwardRef((_, ref) => {
  const font = new FontLoader().parse(inter);
  const { countryCode } = React.useContext(PointContext); // Ambil countryCode dari context

  const width = 0.05; // Lebar antar bar (diperkecil)
  const max_height = 0.2; // Tinggi maksimum bar (diperkecil)
  const min_height = 0.07; // Tinggi minimum bar (diperkecil)
  const range = max_height - min_height;

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPopulationData = async () => {
      try {
        const response = await fetch(
          `https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.TOTL?date=2019:2024&format=json`
        ); // Fetch data populasi berdasarkan `countryCode`
        const jsonData = await response.json();

        if (jsonData && jsonData[1]) {
          const filteredData = jsonData[1]
            .filter(
              (entry) =>
                parseInt(entry.date) >= 2019 && parseInt(entry.date) <= 2024
            )
            .map((entry) => ({
              year: entry.date,
              pop: entry.value || 0,
            }))
            .reverse();
          setData(filteredData);
        }
      } catch (error) {
        console.error("Error fetching population data:", error);
      }
    };

    fetchPopulationData();
  }, [countryCode]); // Refetch data setiap kali countryCode berubah

  const max_population = Math.max(...data.map((e) => e.pop || 0));
  const min_population = Math.min(...data.map((e) => e.pop || 0));
  const range_population = max_population - min_population || 1;

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.scale.set(0.15, 0.15, 0.15); // Terapkan skala keseluruhan yang lebih kecil
    }
  }, [ref]);

  data.forEach((e, index) => {
    e.x = (index - (data.length - 1) / 2) * width;
    e.height =
      ((e.pop - min_population) * range) / range_population + min_height;

    const pastelColors = [
      "#FF5733",
      "#FFC300",
      "#DAF7A6",
      "#33FFBD",
      "#8C33FF",
    ];
    e.color = pastelColors[index % pastelColors.length];
  });

  return (
    <group ref={ref}>
      {/* Judul dan Subtitle */}
      <Text
        position={[0, 0.33, 0]} // Teks di atas grafik
        fontSize={0.025}
        color="#FFFFFF"
        anchorX="center" // Rata tengah X
        anchorY="middle" // Rata tengah Y
      >
        Population Growth
      </Text>
      <Text
        position={[0, 0.29, 0]} // Teks subtitle lebih rendah
        fontSize={0.02}
        color="#AAAAAA"
        anchorX="center"
        anchorY="middle"
      >
        2019 - 2023 by World Bank
      </Text>
      {/* Bar Grafik */}
      {data.map((e) => (
        <Bar
          key={e.year}
          year={e.year}
          pop={e.pop}
          height={e.height}
          x={e.x}
          color={e.color}
        />
      ))}
    </group>
  );
});

export default Population;
