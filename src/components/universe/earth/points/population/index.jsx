import React, {forwardRef} from "react";
import * as THREE from 'three'

import Bar from "./Bar";
import {PointContext} from "../Point";

const Population = forwardRef((_, ref) => {
  const {code} = React.useContext(PointContext)

  const width = 0.05
  const max_height = 0.5
  const min_height = 0.2
  const range = max_height - min_height

  const [data, setData] = React.useState([])

  const max_population = Math.max(...data.map(e => e.pop))
  const min_population = Math.min(...data.map(e => e.pop))
  const range_population = max_population - min_population

  data.forEach((e, index) => {
    e.x = (index - (data.length - 1) / 2) * width
    e.height = ((e.pop - min_population) * range / range_population) + min_height

    const colorDiff = 360 / data.length
    e.color = `#${(new THREE.Color(`hsl(${index * colorDiff}, 100%, 50%)`)).getHexString()}`
  })

  const getData = async () => {
    const res = await fetch(`https://api.worldbank.org/v2/country/${code}/indicator/SP.POP.TOTL?date=2017:2021&format=json`)
    const data = await res.json()

    const populations = data[1].map(e => ({
      year: e.date,
      pop: e.value
    })).reverse()

    setData(populations)
  }

  React.useEffect(() => {
    getData()
  }, [])

  return (
    <group ref={ref}>

      {data.map(e => (
        <Bar year={e.year} pop={e.pop} height={e.height} x={e.x} color={e.color}/>
      ))}
    </group>
  )
})

export default Population