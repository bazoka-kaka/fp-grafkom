// Conversion utilities between degree and radian
export const degToRad = deg => deg * Math.PI / 180
export const radToDeg = rad => rad * 180 / Math.PI

// This is a utility function to get degree distance
// between current time and 00.00 plus the offset from GMT
export const getDegreeDistance = () => {
  // get local date
  const date = new Date()

  // Get offsets in minutes to GMT
  // WIB to GMT => -420 minutes (-7 hours * 60 minutes/hour)
  const offset = date.getTimezoneOffset()

  // get the total minute from 00:00
  const totalMinute = 60 * date.getHours() + date.getMinutes()

  // convert time distance to degree distance
  // degree = minute / 4, because every 4 minutes, earth rotates 1 degree
  return (totalMinute + offset) / 4
}

export const latLonTo3dPosition = (lat, lon, radius = 1) => [
  radius * Math.cos(degToRad(lat)) * Math.sin(degToRad(lon)),
  radius * Math.sin(degToRad(lat)),
  radius * Math.cos(degToRad(lon)) * Math.cos(degToRad(lat))
]

export const latLonTo3dRotation = (lat, lon) => [Math.PI / 2 - degToRad(lat),degToRad(lon), degToRad(0)]