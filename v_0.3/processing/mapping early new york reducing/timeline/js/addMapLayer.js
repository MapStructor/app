function addMapLayer(map, layerConfig, date) {
  if (date) {
    map.addLayer({
      ...layerConfig,
      filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
    });
  } else {
    map.addLayer({
      ...layerConfig,
    });
  }
}
