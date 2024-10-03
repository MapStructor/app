import { SectionLayer, SectionLayerGroup, SectionLayerItem } from "@/app/models/layers/layer.model";
import SectionLayerComponent from "./section-layer-group-item.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faMinusSquare, faPlusSquare, faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import SectionLayerGroupItemComponent from "./section-layer-group-item.component";
import { faCrosshairs, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper";
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model";
import { IconColors } from "@/app/models/colors.model";

type SectionLayerGroupsProps = {
    layersHeader: string,
    group: SectionLayerGroup,
    activeLayerCallback: (activeLayers: string[]) => void,
    activeLayers: string[],
}

const SectionLayerGroupComponent = (props: SectionLayerGroupsProps) => {
    const [layerIsOpen, setLayerIsOpen] = useState<boolean>(false);
    
    const toggleGroup = () => {
        if(props.group.items.length > 0) {
            setLayerIsOpen(!layerIsOpen)
        }
    }

    return (
        <>
            <div className="layer-list-row">
                <input
                type="checkbox"
                style={{
                    paddingRight: "5px",
                    marginRight: "5px"
                }}
                id={`section-layer-group-${props.group?.id ?? ""}`}
                />

                <label htmlFor={`section-layer-group-${props.group?.id ?? ""}`}>
                <FontAwesomeIcon onClick={toggleGroup} icon={props.group.items.length > 0 ? getFontawesomeIcon(props.group.iconType, props.group.isSolid) : (layerIsOpen ? getFontawesomeIcon(FontAwesomeLayerIcons.PLUS_SQUARE, true) : getFontawesomeIcon(FontAwesomeLayerIcons.MINUS_SQUARE, true))} style={{
                    color: props.group.items.length > 0 ? IconColors.GREY : props.group.iconColor,
                }} /> {props.group.label}
                <div className="dummy-label-layer-space"></div> 
                </label>
                <div className="layer-buttons-block">
                    <div className="layer-buttons-list">
                        <FontAwesomeIcon
                        className="zoom-to-layer"
                        title="Zoom to Layer"
                        color="blue"
                        icon={faCrosshairs}
                        onClick={() => {}/*zoomtocenter(layerData.zoomTo || "N/A")*/} // Edit zoomFunctions.js to create this function
                        />
                        <FontAwesomeIcon
                        className="layer-info trigger-popup"
                        title="Layer Info"
                        color="grey"
                        icon={faInfoCircle}
                        onClick={() => {}/*zoomtocenter(layerData.zoomTo || "N/A")*/} // Edit This to pull up a modal
                        />
                    </div>
                </div>
            </div>
            {
                layerIsOpen && props.group.items.map(item => {
                    return (
                        <>
                            <SectionLayerGroupItemComponent activeLayers={props.activeLayers} activeLayerCallback={props.activeLayerCallback} item={item} />
                        </>
                    )
                })
            }
        </>
    )
}

export default SectionLayerGroupComponent;