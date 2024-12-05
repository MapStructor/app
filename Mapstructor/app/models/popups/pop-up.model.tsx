//Props for the slider popup content, all the props
//I looked at in MENY had vastly different fields, so
//this is a generic type with all optional values and
//a required type. We don't get type from the props, when
//we generate/convert the old props in js to this type we'll

import { PopupType } from "./pop-up-type.model";

//hard code a type based on which clickHandle function we're in.
export type GenericPopUpProps = {
    layerName: string | null;
    type: PopupType,
    nid: number | string | undefined,
}
