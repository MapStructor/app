import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper"
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model"
import { MapItem, MapZoomProps } from "@/app/models/maps/map.model"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


type MapFilterComponentProps = {
    map: MapItem,
    displayZoomButton: boolean,
    displayInfoButton: boolean,
    beforeMapCallback: (map: MapItem) => void,
    afterMapCallback: (map: MapItem) => void,
    mapZoomCallback: (zoomProps: MapZoomProps) => void
}

const MapFilterComponent = (props: MapFilterComponentProps) => {
    return (
        <>
            <div className="layer-list-row">
                <input
                    className={props.map.mapId}
                    type="radio"
                    name="ltoggle"
                    onClick={() => props.beforeMapCallback(props.map)}
                    value={props.map.mapId}
                    style={{
                        margin: "2px",
                        marginRight: "8px",
                    }}
                />
                <input
                    className={props.map.mapId}
                    type="radio"
                    name="rtoggle"
                    onClick={() => props.afterMapCallback(props.map)}
                    value={props.map.mapId}
                />
                &nbsp; &nbsp;
                <label htmlFor={props.map.mapId}>
                    { props.map.name }
                    <div className="dummy-label-layer-space"></div></label>
                <div className="layer-buttons-block">
                    <div className="layer-buttons-list">
                        {
                            props.displayZoomButton &&
                            (
                                <div className="tooltip-container" data-title="Zoom to Map">
                                    <FontAwesomeIcon
                                    className="zoom-to-layer"
                                    title="Zoom to Layer"
                                    color="blue"
                                    icon={getFontawesomeIcon(FontAwesomeLayerIcons.CROSSHAIRS)}
                                    onClick={() => {
                                        props.mapZoomCallback({
                                            center: props.map.center,
                                            zoom: props.map.zoom,
                                            speed: 0.2,
                                            curve: 1,
                                            duration: 2500,
                                        })
                                    }}
                                    />
                                </div>
                            )
                        }
                        {
                            !props.displayZoomButton &&
                            (
                                <i style={{width: "16px"}}></i>
                            )
                        }
                        {
                            props.displayInfoButton &&
                            (
                                <div className="tooltip-container" data-title="Map Info">
                                    <FontAwesomeIcon
                                    className="layer-info trigger-popup"
                                    color="grey"
                                    icon={getFontawesomeIcon(FontAwesomeLayerIcons.INFO_CIRCLE)}
                                    onClick={() => {}/*zoomtocenter(layerData.zoomTo || "N/A")*/} // Edit This to pull up a modal
                                    />
                                </div>
                            )
                        }
                        {
                            !props.displayInfoButton &&
                            (
                                <i style={{width: "16px"}}></i>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MapFilterComponent