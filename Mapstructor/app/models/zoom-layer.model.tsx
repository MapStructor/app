
export interface ZoomLabel {
    title: string,
    center?: [long: number, lat: number],
    bounds?: [[long1: number, lat1: number], [long2: number, lat2: number]],
    minZoom?: number,
    zoom?: number,
    bearing?: number,
    zoomToBounds: boolean,
    textStyling: ZoomLabelTextStyling
}

export interface ZoomLabelTextStyling {
    useTextSizeZoomStyling: boolean,
    textSizeDefault: number,
    textSizeStops: [[zoom1: number, val1: number], [zoom2: number, val2: number]],
    useTextColorZoomStyling: boolean,
    textColorDefault: string,
    textColorStops: [[zoom1: number, val1: string], [zoom2: number, val2: string]],
    useTextHaloWidthZoomStyling: boolean,
    textHaloWidthDefault: number,
    textHaloWidthStops: [[zoom1: number, val1: number], [zoom2: number, val2: number]],
    useTextHaloBlurZoomStyling: boolean,
    textHaloBlurDefault: number,
    textHaloBlurStops: [[zoom1: number, val1: number], [zoom2: number, val2: number]],
    useTextHaloColorZoomStyling: boolean,
    textHaloColorDefault: string,
    textHaloColorStops: [[zoom1: number, val1: string], [zoom2: number, val2: string]],
    useTextOpacityZoomStyling: boolean,
    textOpacityDefault: number,
    textOpacityStops: [[zoom1: number, val1: number], [zoom2: number, val2: number]],
}