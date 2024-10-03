import { IconColors } from "../colors.model"
import { FontAwesomeLayerIcons } from "../font-awesome.model"

export type SectionLayer = {
    id: number,
    label: string,
    groups: SectionLayerGroup[]
}

export type SectionLayerItem = {
    id: number,
    label: string,
    iconColor: IconColors,
    iconType: FontAwesomeLayerIcons,
    isSolid: boolean,
    layerId?: string,
}

export type SectionLayerGroup = {
    id: number,
    label: string,
    iconColor: IconColors,
    iconType: FontAwesomeLayerIcons,
    isSolid: boolean,
    items: SectionLayerItem[]
}