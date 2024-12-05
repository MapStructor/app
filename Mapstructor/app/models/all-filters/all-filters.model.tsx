import { Layer, Map } from "@prisma/client"
import { Moment } from "moment"

export type MapCompareFilters = {
    beforeMap?: mapboxgl.Map,
    afterMap?: mapboxgl.Map,
    selectedLayers: Layer[],
    date: Moment
}