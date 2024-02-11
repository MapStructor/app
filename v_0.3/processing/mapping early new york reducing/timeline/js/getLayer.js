function getLayer(layerId) {
  // Use replace() method to replace the matched pattern with an empty string
  const idWithoutLeftOrRight = layerId
    .replace(/(-right|-right\b|-\Bright\b)/g, "")
    .replace(/(-left|-left\b|-\Bleft\b)/g);
  if (layerId === "lot_events-bf43eb-left" || layerId === "lot_events-bf43eb-right")
    return layers.find(({ id }) => id === layerId);
  return layers.find(({ id }) => id === idWithoutLeftOrRight);
}
