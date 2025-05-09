
export type MapFiltersItem = {
    id: number,
    name: string,
    label: string,
    defaultCheckedForBeforeMap: boolean,
    defaultCheckedForAfterMap: boolean,
    showInfoButton: boolean,
    showZoomButton: boolean,
    // You should get the MapID from the MapBox URL, IE: in the URL mapbox://styles/mapny/clm2yrx1y025401p93v26bhyl, the MapID would be clm2yrx1y025401p93v26bhyl
    mapId: string
}

export type MapFiltersGroup = {
    id: number,
    name: string,
    label: string,
    maps: MapFiltersItem[]
}