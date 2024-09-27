import mapboxgl from 'mapbox-gl';

// Layer and event data structures
interface Layer {
  type: string;
  id: string;
  sourceId: string;
}

interface EventLayer extends Layer {
  popup: string;
  infoProperty: string;
}

const layerData: Layer[] = [
  { type: "layer", id: "lot_events-bf43eb-left", sourceId: "lot_events-bf43eb" },
  { type: "layer", id: "dutch_grants-5ehfqe-left", sourceId: "dutch_grants-5ehfqe" },
];

const eventLayerData: EventLayer[] = [
  { type: "layer", id: "dutch_grants-5ehfqe-left", sourceId: "dutch_grants-5ehfqe", popup: "DutchGrantPopUp", infoProperty: "Lot" },
  { type: "layer", id: "lot_events-bf43eb-left", sourceId: "lot_events-bf43eb", popup: "StatePopUp", infoProperty: "TAXLOT" },
];

// Helper function to add layers and events to the before map
export function addBeforeLayers(map: mapboxgl.Map, date: string) {
  removeMapLayers(map, layerData);
  addMapLayers(map, layerData, date);
  setupLayerEvents(map, eventLayerData);
}

function addMapLayers(map: mapboxgl.Map, layers: Layer[], date: string) {
  layers.forEach(layer => {
    const beforeLayer = getBeforeLayer(map, layer.id);
    if (beforeLayer) {
      map.addLayer(beforeLayer);
    }
  });
}

function removeMapLayers(map: mapboxgl.Map, layers: Layer[]) {
  layers.forEach(layer => {
    map.removeLayer(layer.id);
  });
}

function setupLayerEvents(map: mapboxgl.Map, layers: EventLayer[]) {
  layers.forEach(layer => {
    let hoveredId: string | number | null = null;

    map.on("mouseenter", layer.id, (e) => {
      map.getCanvas().style.cursor = "pointer";
      const popup = getPopupByName(layer.popup);
      if (popup) {
        popup.setLngLat(e.lngLat).addTo(map);
      }
    });

    map.on("mousemove", layer.id, (e) => {
      if (e.features?.length) {
        if (hoveredId !== null) {
          map.setFeatureState({ source: layer.id, id: hoveredId }, { hover: false });
        }

        if (e.features[0].id !== undefined) {
          hoveredId = e.features[0].id;
          map.setFeatureState({ source: layer.id, id: hoveredId }, { hover: true });
        }
      }
    });

    map.on("mouseleave", layer.id, () => {
      map.getCanvas().style.cursor = "";
      if (hoveredId) {
        map.setFeatureState({ source: layer.id, id: hoveredId }, { hover: false });
        hoveredId = null;
      }
    });
  });
}

function getBeforeLayer(map: mapboxgl.Map, id: string): mapboxgl.AnyLayer | null {
  const layer = map.getLayer(id);
  if (layer && "type" in layer) {
    return layer as mapboxgl.AnyLayer;
  }
  return null;
}

function getPopupByName(name: string): mapboxgl.Popup | null {
  const popups: Record<string, mapboxgl.PopupOptions> = {
    "DutchGrantPopUp": { closeButton: false, closeOnClick: false },
    "StatePopUp": { closeButton: true, closeOnClick: true },
  };
  const popupOptions = popups[name];
  return popupOptions ? new mapboxgl.Popup(popupOptions) : new mapboxgl.Popup();
}
