import { MutableRefObject } from "react";
import { ZoomLabel } from "../models/zoom-layer.model";
import { LayerSpecification, Map } from "mapbox-gl";
import { usePathname, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


export function createLabel(props: ZoomLabel, before: boolean) {
    let returnVal =  {
      // Ggnerates a unique ID for the label by transforming the title to lowercase and replacing spaces with hyphens
      id: `label-${props.title.toLowerCase().replace(/\s+/g, '-')}-${before ? 'before' : 'after'}`,
      type: "symbol",
        // defines the data source as GeoJSON, specifying the label's coordinates and properties
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            properties: { title: props.title, icon: "circle" },
            geometry: { type: "Point", coordinates: props.center }
          }],
        },
      },
      // conditionally includes the minzoom property if a minZoom value is provided.
      ...(props.minZoom && { minzoom: props.minZoom }),
  
      // defines the layout properties for the label, including text font, size, and visibility.
      layout: {
        visibility: "visible",
        "text-font": ["Asap Medium"],
        "text-field": "{title}",
        "text-size": props.textStyling.useTextSizeZoomStyling ? {
          default: props.textStyling.textSizeDefault,
          stops: props.textStyling.textSizeStops
        } : props.textStyling.textSizeDefault,
      },
      paint: {
        "text-color": props.textStyling.useTextColorZoomStyling ? {
          default: props.textStyling.textColorDefault,
          stops: props.textStyling.textColorStops
        } : props.textStyling.textColorDefault,
        "text-halo-width": props.textStyling.useTextHaloWidthZoomStyling ? {
          default: props.textStyling.textHaloWidthDefault,
          stops: props.textStyling.textHaloWidthStops
        } : props.textStyling.textHaloWidthDefault,
        "text-halo-blur": props.textStyling.useTextHaloBlurZoomStyling ? {
          default: props.textStyling.textHaloBlurDefault,
          stops: props.textStyling.textHaloBlurStops
        } : props.textStyling.textHaloBlurDefault,
        "text-halo-color": props.textStyling.useTextHaloColorZoomStyling ? {
          default: props.textStyling.textHaloColorDefault,
          stops: props.textStyling.textHaloColorStops
        } : props.textStyling.textHaloColorDefault,
        "text-opacity": props.textStyling.useTextOpacityZoomStyling ? {
          default: props.textStyling.textOpacityDefault,
          stops: props.textStyling.textOpacityStops
        } : props.textStyling.textOpacityDefault,
      },
  };
    return returnVal;
}

export function addInteractivityToLabel(mapRef: MutableRefObject<Map | null>, layer: ZoomLabel, before: boolean, router: AppRouterInstance, pathname: string) {
    let currMap: Map | null = mapRef.current;

    if(currMap == null || currMap.getSource(`label-${layer.title.toLowerCase().replace(/\s+/g, '-')}-${before ? 'before' : 'after'}`) !== undefined) return;

    const labelObject = createLabel(layer, before);
    let labelId = labelObject.id;
    currMap?.addLayer(labelObject as any);

    currMap?.on("click", labelId, function () {
        if(layer.bounds && layer.zoomToBounds) {
            currMap?.fitBounds(layer.bounds, { bearing: layer.bearing })
        } else if(layer.center) {
            currMap?.easeTo({
                center: layer.center,
                zoom: layer.zoom,
                speed: 0.2,
                curve: 1,
                duration: 1000,
                easing(t) {
                  return t;
                }
              });
            if(layer?.zoom != null && layer?.center != null && layer?.bearing != null) {
              router.push(`${pathname}/#${layer.zoom}/${layer.center[0]}/${layer.center[1]}/${layer.bearing}`)
            }
        }
    });
}

export function zoomToWorld(mapRef: MutableRefObject<Map | null>) {
  let currMap: Map | null = mapRef.current;

  if(currMap == null) return;

  currMap.fitBounds([
    [-179, -59],
    [135, 77],
  ], { bearing: 0 });
}