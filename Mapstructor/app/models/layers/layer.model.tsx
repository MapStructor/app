import { IconColors } from "../colors.model"
import { FontAwesomeLayerIcons } from "../font-awesome.model"

export type SectionLayer = {
    id: string,
    label: string,
    groups: SectionLayerGroup[]
}

export type SectionLayerItem = {
    id: string,
    label: string,
    iconColor: IconColors | string,
    iconType: FontAwesomeLayerIcons,
    center: [long: number, lat: number],
    zoom: number,
    bearing: number,
    isSolid: boolean,
    layerId?: string,
}

export type SectionLayerGroup = {
    id: string,
    label: string,
    iconColor: IconColors | string,
    iconType: FontAwesomeLayerIcons,
    isSolid: boolean,
    items: SectionLayerItem[],
    center?: [long: number, lat: number],
    zoom?: number,
    bearing?: number
}