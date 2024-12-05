import { SectionLayer, SectionLayerItem } from "@/app/models/layers/layer.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { faMinusSquare, faPlusSquare, faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { faCrosshairs, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper";
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model";
import { MapZoomProps } from "@/app/models/maps/map.model";

type SectionLayerGroupItemProps = {
    item: SectionLayerItem,
    activeLayerCallback: (activeLayers: string[]) => void,
    activeLayers: string[],
    openWindow: () => void,
    editFormVisibleCallback: (isOpen: boolean) => void,
    mapZoomCallback:(zoomProps: MapZoomProps) => void,
    fetchLayerDataCallback: (id: string) => void,
    afterSubmit: () => void,
    upperCheckBox: boolean,
    authToken?: string
}

const SectionLayerGroupItemComponent = (props: SectionLayerGroupItemProps) => {
    const [checkbox, setCheckbox] = useState<boolean>(false);

    const handleLayerChange = () => {
        if(props.item.layerId)
        {
            if (props.activeLayers.includes(props.item.layerId)) 
            {
                props.activeLayerCallback(props.activeLayers.filter((d) => d !== props.item.layerId));
            } 
            else 
            {
                props.activeLayerCallback([...props.activeLayers, props.item.layerId]);
            }
        }
    }




    const UpLayerData = async (id: string) => {
        try {
            await fetch('http://localhost:3000/api/LayerData/Rearrange/Up/' + id, {
                method: 'PUT'
            });
        }
        catch(err) {
            console.log(err)
        }
    }

    const DownLayerData = async (id: string) => {
        try {
            await fetch('http://localhost:3000/api/LayerData/Rearrange/Down/' + id, {
                method: 'PUT'
            });
        }
        catch(err) {
            console.log(err)
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
                checked={props.activeLayers.includes(props.item.layerId!)}
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
                        {
                            (props.authToken ?? '') !== '' && (
                                <div className="tooltip-container" data-title="Edit Layer">
                                    <FontAwesomeIcon
                                    className="edit-button"
                                    color="black"
                                    icon={getFontawesomeIcon(FontAwesomeLayerIcons.PEN_TO_SQUARE)}
                                    onClick={() => {
                                        props.openWindow();
                                        props.fetchLayerDataCallback(props.item.layerId ?? '');
                                        props.editFormVisibleCallback(true);
                                    }}
                                    />
                                </div>
                            )
                        }
                        {
                            (props.authToken ?? '') !== '' && (
                                <div className="tooltip-container" data-title="Move Up">
                                    <FontAwesomeIcon 
                                    className="decrement-order"
                                    color="black"
                                    icon={getFontawesomeIcon(FontAwesomeLayerIcons.UP_ARROW)}
                                    onClick={async() => {
                                            await UpLayerData(props.item.id)
                                            props.afterSubmit()
                                        }}
                                    />
                                </div>
                            )
                        }
                        {
                            (props.authToken ?? '') !== '' && (
                                <div className="tooltip-container" data-title="Move Down">
                                    <FontAwesomeIcon 
                                    className="increment-order"
                                    color="black"
                                    icon={getFontawesomeIcon(FontAwesomeLayerIcons.DOWN_ARROW)}
                                    onClick={async() => {
                                            await DownLayerData(props.item.id)
                                            props.afterSubmit()
                                        }}
                                    />
                                </div>
                            )
                        }
                        <div className="tooltip-container" data-title="Zoom to Layer">
                            <FontAwesomeIcon
                            className="zoom-to-layer"
                            color="blue"
                            icon={getFontawesomeIcon(FontAwesomeLayerIcons.CROSSHAIRS)}
                            onClick={() => {
                                props.mapZoomCallback({
                                    center: props.item.center,
                                    zoom: props.item.zoom,
                                    speed: 0.2,
                                    curve: 1,
                                    duration: 2500,
                                })
                            }}
                            />
                        </div>
                        <div className="tooltip-container" data-title="Layer Info">
                            <FontAwesomeIcon
                            className="layer-info trigger-popup"
                            color="grey"
                            icon={getFontawesomeIcon(FontAwesomeLayerIcons.INFO_CIRCLE)}
                            onClick={() => {}/*zoomtocenter(layerData.zoomTo || "N/A")*/} // Edit This to pull up a modal
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionLayerGroupItemComponent;