import { SectionLayer, SectionLayerGroup, SectionLayerItem } from "@/app/models/layers/layer.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import SectionLayerGroupItemComponent from "./section-layer-group-item.component";
import { faCrosshairs, faInfoCircle, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper";
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model";
import { IconColors } from "@/app/models/colors.model";
import NewSectionLayerGroupItem from "../new-section-layer-group-item.component";
import { MapZoomProps } from "@/app/models/maps/map.model";
import { LayerData as PrismaLayer } from '@prisma/client';
import LayerForm from "../forms/LayerForm";
import Modal from 'react-modal';
import Loader from "../loading/loading.component";

type SectionLayerGroupsProps = {
    layersHeader: string,
    sectionName: string,
    group: SectionLayerGroup,
    activeLayerCallback: (activeLayers: string[]) => void,
    activeLayers: string[],
    openWindow: () => void,
    beforeOpen: () => void,
    afterClose: () => void,
    mapZoomCallback:(zoomProps: MapZoomProps) => void,
    editFormVisibleCallback: (isOpen: boolean) => void,
    fetchLayerGroupCallback: (id: string) => void,
    removeMapLayerCallback: (id: string) => void,
    afterSubmit: () => void,
    authToken: string
}

const SectionLayerGroupComponent = (props: SectionLayerGroupsProps) => {
    const [layerIsOpen, setLayerIsOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [checkboxValue, setcheckboxValue] = useState<boolean>(false);
    const [layer, setLayer] = useState<PrismaLayer>();
    
    const toggleGroup = (e: any) => {
        if(props.group.items.length > 0) {
            setLayerIsOpen(!layerIsOpen)
        }
        e.stopPropagation();
    }

    const closeEdit = () => {
        props.afterClose();
        setEditOpen(false);
        setLayer(undefined);
    }

    const fetchLayerData = async (id: string) => {
        setIsLoading(true);
        try {
            await fetch('http://localhost:3000/api/LayerData/' + id)
            .then((response) => {
            response.json()?.then(parsed => {
                setLayer(parsed.layerData);
            })
        });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const UpLayerGroup = async (id: string) => {
        setIsLoading(true);
        try {
            await fetch('http://localhost:3000/api/LayerGroup/Rearrange/Up/' + id, {
                method: 'PUT'
            });
        }
        catch(err) {
            console.log(err)
        }
        finally {
            setIsLoading(false);
        }
    }

    const DownLayerGroup = async (id: string) => {
        setIsLoading(true);
        try {
            await fetch('http://localhost:3000/api/LayerGroup/Rearrange/Down/' + id, {
                method: 'PUT'
            });
        }
        catch(err) {
            console.log(err)
        }
        finally {
            setIsLoading(false);
        }
    }
    
    const handleCheckboxChange = () => {
        setcheckboxValue(!checkboxValue);
        let updatedLayerIds: (string | undefined)[];
        if (checkboxValue) 
        {
            updatedLayerIds = props.activeLayers.filter(
                (layerId) => !props.group.items.some((item) => item.layerId === layerId)
            );
        } 
        else 
        {
            const layerIdsToAdd = props.group.items
                .filter((item) => item.layerId && !props.activeLayers.includes(item.layerId))
                .map((item) => item.layerId);
    
                updatedLayerIds = [...props.activeLayers, ...layerIdsToAdd];
        }
    
        props.activeLayerCallback(updatedLayerIds as string[]);
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
                checked={checkboxValue}
                onChange={handleCheckboxChange}
                id={`section-layer-group-${props.group?.id ?? ""}`}
                />
                <FontAwesomeIcon id={props.group.items.length > 0 ? 'group-layer-plus-minus-icon' : ""} onClick={toggleGroup} icon={layerIsOpen ? getFontawesomeIcon(FontAwesomeLayerIcons.MINUS_SQUARE, true) : getFontawesomeIcon(FontAwesomeLayerIcons.PLUS_SQUARE, true)} 
                style={{color: props.group.items.length > 0 ? IconColors.DARK_GREY : props.group.iconColor, paddingRight: "5px"}}/>
                <label htmlFor={`section-layer-group-${props.group?.id ?? ""}`}>
                {props.group.label}
                <div className="dummy-label-layer-space"></div> 
                </label>
                <div className="layer-buttons-block">
                    <div className="layer-buttons-list">
                        {
                            (props.authToken ?? '') !== '' && (
                                <div className="tooltip-container" data-title="Edit Group">
                                <FontAwesomeIcon
                                    className="edit-button"
                                    color="black"
                                    icon={getFontawesomeIcon(FontAwesomeLayerIcons.PEN_TO_SQUARE)}
                                    onClick={() => {
                                        props.openWindow();
                                        props.fetchLayerGroupCallback(props.group.id ?? '');
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
                                            await UpLayerGroup(props.group.id)
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
                                            await DownLayerGroup(props.group.id)
                                            props.afterSubmit()
                                        }}
                                    />
                                </div>
                            )
                        }
                        <div className="tooltip-container" data-title="Zoom to Group">
                                <FontAwesomeIcon
                                className="zoom-to-layer"
                                color="blue"
                                icon={faCrosshairs}
                                onClick={() => props.mapZoomCallback({
                                    center: props.group.center ?? [0, 0],
                                    zoom: props.group.zoom ?? 0,
                                    speed: 0.2,
                                    curve: 1,
                                    duration: 2500,
                                })} // Edit zoomFunctions.js to create this function
                                />
                        </div>
                        <div className="tooltip-container" data-title="Group Info">
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
            </div>
            {
                layerIsOpen && props.group.items.map((item, idx) => {
                    return (
                        <>
                            <SectionLayerGroupItemComponent
                                authToken={props.authToken}
                                key={'seclaygroupitem' + idx}
                                activeLayers={props.activeLayers}
                                activeLayerCallback={props.activeLayerCallback}
                                item={item}
                                openWindow={props.openWindow}
                                editFormVisibleCallback={setEditOpen}
                                mapZoomCallback={props.mapZoomCallback}
                                fetchLayerDataCallback={fetchLayerData}
                                afterSubmit={props.afterSubmit}
                                upperCheckBox={checkboxValue}/>
                        </>
                    )
                })
            }
            {
                (layerIsOpen || props.group?.items?.length == 0) &&
                (
                    <NewSectionLayerGroupItem
                    authToken={props.authToken}
                    beforeOpen={props.beforeOpen} 
                    afterClose={props.afterClose} 
                    groupName={props.group.id} 
                    sectionName={props.sectionName}>
                    </NewSectionLayerGroupItem>
                )
            }
            {
                editOpen && 
                (
                    <Modal
                        style={{
                            content: {
                                width: '30%',
                                right: '5px'
                            }
                        }}
                        isOpen={editOpen}
                        onRequestClose={() => {
                            closeEdit();
                        }}
                        contentLabel='Edit Layer'
                    >
                    {
                        isLoading ? (
                            <Loader
                            center={true}/>
                        ) : (
                            <LayerForm
                            authToken={props.authToken}
                            groupName={props.group.id} 
                            sectionName={props.sectionName} 
                            layerConfig={layer} 
                            afterSubmit={() => {
                                props.removeMapLayerCallback(layer?.id ?? '');
                                closeEdit();
                                }}>
                            </LayerForm>
                        )
                    }
                    </Modal> 
                )
            }
        </>
    )
}

export default SectionLayerGroupComponent;