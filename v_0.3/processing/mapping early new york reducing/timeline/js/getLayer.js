function getLayer(layerId) {
  // Use replace() method to replace the matched pattern with an empty string
  const idWithoutLeftOrRight = layerId
    .replace(/(-right|-right\b|-\Bright\b)/g, "")
    .replace(/(-left|-left\b|-\Bleft\b)/g);
  console.log("Removed id ==> ", layerId, idWithoutLeftOrRight);
  console.log(layers.find(({ id }) => id === idWithoutLeftOrRight));
  if (layerId === "lot_events-bf43eb-right")
    return layers.find(({ id }) => id === layerId);
  return layers.find(({ id }) => id === idWithoutLeftOrRight);
}
