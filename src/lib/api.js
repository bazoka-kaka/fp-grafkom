export const getCentralPoint = async code => {
    let output = null
    try {
      const response = await fetch(`https://services9.arcgis.com/l9yXFvhjz46ekkZV/arcgis/rest/services/Countries_Centroids/FeatureServer/0/query?where=ISO='${code}'&f=pgeojson`)
      output = await response.json()
      output = output.features?.[0]?.geometry?.coordinates
    } catch (e) {
      console.log(e)
    }
    return output
  }