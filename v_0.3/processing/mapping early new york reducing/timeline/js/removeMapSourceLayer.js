function removeMapSourceLayer(map, points) {
  points.forEach((point) => {
    switch (point.type) {
      case "source":
        if (map.getSource(point.id)) {
          map.removeSource(point.id);
        }
        return;

      case "layer":
        if (map.getLayer(points.id)) {
          map.removeLayer(points.id);
        }
    }
  });
}

