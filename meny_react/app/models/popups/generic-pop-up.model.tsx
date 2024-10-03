//Props for the slider popup content, all the props
//I looked at in MENY had vastly different fields, so
//this is a generic type with all optional values and
//a required type. We don't get type from the props, when
//we generate/convert the old props in js to this type we'll
//hard code a type based on which clickHandle function we're in.
export type GenericPopUpProps = {
    Aligned?: string,
    DayEnd1?: number,
    notes?: string,
    styling1?: string,
    block?: string,
    id?: number
    lot?: string,
    new_link?: string,
    old_link_2?: string,
    tax_lots_2?: string,
    tax_lots_3?: string,
    DayEnd?: number,
    DayStart?: number,
    TAXLOT?: string,
    color?: string,
    color_num?: number,
    end_date?:string,
    num?: number,
    start_date?: string, 
    title?: string,
    FID_1?: number,
    //Actually used props in popups
    lot2?: string,
    tax_lots_1?: string,
    nid?: number | string,
    //Used with null nid
    Lot?: string,
    name?: string,
    day1?: string,
    day2?: string,
    year1?: string,
    year2?: string,
    descriptio?: string,
    type: "castello-taxlot" | "lot-event" | "long-island-native-groups" | "dutch-grant",
}
