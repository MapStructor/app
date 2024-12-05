import { MapFilterItem } from "@prisma/client"
import { MapItem } from "./map.model"

export type MapFiltersGroup = {
    id: number,
    name: string,
    label: string,
    groupId: string,
    maps: MapItem[],
    mapfilteritems: MapFilterItem[]
}