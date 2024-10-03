import { SectionLayer, SectionLayerItem } from "@/app/models/layers/layer.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faMinusSquare, faPlusSquare, faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { faCrosshairs, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper";
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model";

type SectionLayerGroupItemProps = {
    item: SectionLayerItem,
    activeLayerCallback: (activeLayers: string[]) => void,
    activeLayers: string[],
}

const SectionLayerGroupItemComponent = (props: SectionLayerGroupItemProps) => {

    const handleLayerChange = () => {
        if(props.item.layerId)
        {
            if (props.activeLayers.includes(props.item.layerId)) {
                props.activeLayerCallback(props.activeLayers.filter((d) => d !== props.item.layerId));
              } else {
                props.activeLayerCallback([...props.activeLayers, props.item.layerId]);
              }
        }
    }

    return (
        <>
            <div className="layer-list-row">
                <input
                type="checkbox"
                id={`section-layer-group-item-${props.item?.id ?? ""}`}
                style={{
                    marginLeft: "20px",
                    marginRight: "5px"
                }}
                onChange={handleLayerChange}
                />

                <label htmlFor={`section-layer-group-item-${props.item?.id ?? ""}`}>
                <FontAwesomeIcon icon={getFontawesomeIcon(props.item.iconType, props.item.isSolid)} style={{
                    color: props.item.iconColor
                }} /> {props.item.label}
                <div className="dummy-label-layer-space"></div> 
                </label>
                <div className="layer-buttons-block">
                    <div className="layer-buttons-list">
                        <FontAwesomeIcon
                        className="zoom-to-layer"
                        title="Zoom to Layer"
                        color="blue"
                        icon={getFontawesomeIcon(FontAwesomeLayerIcons.CROSSHAIRS)}
                        onClick={() => {}/*zoomtocenter(layerData.zoomTo || "N/A")*/} // Edit zoomFunctions.js to create this function
                        />
                        <FontAwesomeIcon
                        className="layer-info trigger-popup"
                        title="Layer Info"
                        color="grey"
                        icon={getFontawesomeIcon(FontAwesomeLayerIcons.INFO_CIRCLE)}
                        onClick={() => {}/*zoomtocenter(layerData.zoomTo || "N/A")*/} // Edit This to pull up a modal
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionLayerGroupItemComponent;