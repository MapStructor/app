import mapboxgl, { CustomLayerInterface, SourceSpecification } from 'mapbox-gl';
import { AnyLayer } from 'mapbox-gl';

// Layer and event data structures
interface Layer extends AnyLayer {
  type: string;
  id: string;
  source: {
    type: string;
    url: string;
  };
  "source-layer": string;
  layout: {
    visibility: "visible" | "none";
  };
  paint: any;
}

interface SourceLayer {
  id: string;
  source: SourceSpecification;
}

interface EventLayer {
  type: string;
  id: string;
  sourceId: string;
  popup: string;
  infoProperty: string;
  visibility: string;
}

const sourceLayers: SourceLayer[] = [
  { 
    id: "grant-lots-lines",
    source: {
      type: "vector",
      url: "mapbox://mapny.7dw0tqar",
    },
  },
  {
    id: "dutch_grants-5ehfqe",
    source: {
      type: "vector",
      url: "mapbox://mapny.7q2vs9ar",
    },
  },
  {
    id: "lot_events-bf43eb",
    source: {
      type: "vector",
      url: "mapbox://mapny.9s9s67wu",
    }
  },
  {
    id: "places",
    source: {
      type: "vector",
      url: "mapbox://mapny.cvcg7wo0",
    },
  },
]

const layerData: AnyLayer[] = [
  { id: "grant-lots-lines",
    type: "line",
    source: "grant-lots-lines",
    layout: {
      visibility: "none",
    },
    "source-layer": "dutch_grants_lines-0y4gkx",
    paint: {
      "line-color": "#FF0000",
      "line-width": 3,
      "line-opacity": 0.8,
    },
  },
  { id: "dutch_grants-5ehfqe",
    type: "fill",
    source: "dutch_grants-5ehfqe",
    layout: {
      visibility: "none"
    },
    "source-layer": "dutch_grants-5ehfqe",
    paint: {
      "fill-color": "#e3ed58",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.8,
        0.45,
      ],
      "fill-outline-color": "#FF0000",
    }
  },
  {
    id: "dutch_grants-5ehfqe-highlighted",
    type: "fill",
    source: "dutch_grants-5ehfqe",
    layout: {
      visibility: "none"
    },
    "source-layer": "dutch_grants-5ehfqe",
    paint: {
      "fill-color": "#e3ed58",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.8,
        0,
      ],
      "fill-outline-color": "#FF0000",
    },
  },
  {
    id: "lot_events-bf43eb",
    type: "circle",
    source: "lot_events-bf43eb",
    layout: {
      visibility: "none"
    },
    "source-layer": "lot_events-bf43eb",
    paint: {
      "circle-color": {
        type: "categorical",
        property: "color",
        stops: [
          ["6", "#0000ee"],
          ["5", "#097911"],
          ["4", "#0000ee"],
          ["3", "#097911"],
          ["2", "#0000ee"],
          ["1", "#097911"],
        ],
        default: "#FF0000",
      },
      "circle-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.5,
        1,
      ],
      "circle-stroke-width": 2,
      "circle-stroke-color": {
        type: "categorical",
        property: "color",
        stops: [
          ["6", "#0000ee"],
          ["5", "#097911"],
          ["4", "#0000ee"],
          ["3", "#097911"],
          ["2", "#0000ee"],
          ["1", "#097911"],
        ],
        default: "#FF0000",
      },
      "circle-stroke-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0,
      ],
      "circle-radius": {
        type: "categorical",
        property: "TAXLOT",
        stops: [["C7", 9]],
      },
    },
  },
  {
    id: "places",
    type: "circle",
    source: "places",
    layout: {
      visibility: "none"
    },
    "source-layer": "taxlots-cpwvol",
    paint: {
      "circle-color": "#FF0000",
      "circle-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.5,
        1,
      ],
      "circle-stroke-width": 2,
      "circle-stroke-color": "#FF0000",
      "circle-stroke-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0,
      ],
    },
  },
];

const eventLayerData: EventLayer[] = [
  { type: "layer", id: "dutch_grants-5ehfqe-left", sourceId: "dutch_grants-5ehfqe", popup: "DutchGrantPopUp", infoProperty: "Lot", visibility: "visible"},
  { type: "layer", id: "lot_events-bf43eb-left", sourceId: "lot_events-bf43eb", popup: "StatePopUp", infoProperty: "TAXLOT", visibility: "visible" },
];

// Helper function to add layers and events to the before map
export function addBeforeLayers(map: mapboxgl.Map, date: string) {
  removeMapLayers(map, layerData);
  addMapSourceLayers(map, sourceLayers)
  addMapLayers(map, layerData, date);
  setupLayerEvents(map, eventLayerData);
}

function addMapSourceLayers(map: mapboxgl.Map, sourceLayerData: SourceLayer[])
{
  sourceLayerData.forEach(layer => {
    map.addSource(layer.id, layer.source);
  });
}

function addMapLayers(map: mapboxgl.Map, layers: AnyLayer[], date: string) {
  layers.forEach(layer => {
    map.addLayer(layer);
  });
}

function removeMapLayers(map: mapboxgl.Map, layers: AnyLayer[]) {
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
