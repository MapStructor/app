import { SectionLayer, SectionLayerGroup, SectionLayerItem } from "@/app/models/layers/layer.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { faMinusSquare, faPlusSquare, faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import SectionLayerGroupComponent from "./section-layer-group.component";
import NewSectionLayerGroup from "../new-section-layer-group.component";
import { MapZoomProps } from "@/app/models/maps/map.model";
import NewLayerGroupForm from "../forms/LayerGroupForm";
import Modal from 'react-modal';
import { LayerGroup as PrismaLayerGroup } from '@prisma/client';
import Loader from "../loading/loading.component";
import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper";
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model";
import NewLayerSectionForm from "../forms/NewLayerSectionForm";
import { IconColors } from "@/app/models/colors.model";


type SectionLayerProps = {
    layersHeader: string,
    layer: SectionLayer,
    activeLayerCallback: (activeLayers: string[]) => void,
    activeLayers: string[],
    openWindow: () => void,
    beforeOpen: () => void,
    afterClose: () => void,
    mapZoomCallback:(zoomProps: MapZoomProps) => void,
    getLayerSectionsCallback: () => void,
    removeMapLayerCallback: (id: string) => void,
    afterSubmit: () => void,
    authToken: string
}

const SectionLayerComponent = (props: SectionLayerProps) => {
    const [layerIsOpen, setLayerIsOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [editSectionOpen, setEditSectionOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [layerGroup, setLayerGroup] = useState<PrismaLayerGroup>();
    const [layerSection, setLayerSection] = useState<PrismaLayerGroup>();

    const closeEdit = () => {
        props.afterClose();
        setEditOpen(false);
        setLayerGroup(undefined);
    }

    const fetchLayerSection = async (id: string) => {
        setIsLoading(true);
        try {
            await fetch('http://localhost:3000/api/LayerSection/' + id) 
            .then((response) => {
            response.json()?.then(parsed => {
                setLayerSection(parsed.layerSection);
            })
        });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
          setIsLoading(false);
        }
    };

    const fetchLayerGroup = async (id: string) => {
        setIsLoading(true);
        try {
            await fetch('http://localhost:3000/api/LayerGroup/' + id) 
            .then((response) => {
            response.json()?.then(parsed => {
                setLayerGroup(parsed.layerGroup);
            })
        });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const UpLayerSection = async (id: string) => {
        setIsLoading(true);
        try {
            await fetch('http://localhost:3000/api/LayerSection/Rearrange/Up/' + id, {
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

    const DownLayerSection = async (id: string) => {
        setIsLoading(true);
        try {
            await fetch('http://localhost:3000/api/LayerSection/Rearrange/Down/' + id, {
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

    return (
        <>
            <center style={{paddingTop: "20px"}}>
                {editSectionOpen ? (
                    <>
                        {isLoading ? (
                            <Loader
                            center={false}/>
                        ) : (
                            <NewLayerSectionForm
                                authToken={props.authToken}
                                afterSubmit={() => {
                                    setEditSectionOpen(false);
                                    setLayerSection(undefined);
                                    props.getLayerSectionsCallback();
                                }}
                                layerSection={layerSection}
                                afterCancel={() => {}}>
                            </NewLayerSectionForm>
                        )}
                    </>
                ) : (
                    <>
                        <FontAwesomeIcon onClick={() => setLayerIsOpen(!layerIsOpen)} color={IconColors.DARK_GREY} icon={layerIsOpen ? getFontawesomeIcon(FontAwesomeLayerIcons.MINUS_SQUARE, true) : getFontawesomeIcon(FontAwesomeLayerIcons.PLUS_SQUARE, true)}
                        id="folder-plus-minus-icon" />
                        <b>
                        {props.layersHeader ?? "" /* Possibly need a different "DisplayName" prop to be used for this if not formatted correctly */}
                        </b>
                        <div className="layer-buttons-block">
                            <div className="layer-buttons-list">
                                {
                                    (props.authToken ?? '') !== '' && (
                                        <div className="tooltip-container" data-title="Edit Folder">
                                            <FontAwesomeIcon
                                                className="edit-button"
                                                color="black"
                                                icon={getFontawesomeIcon(FontAwesomeLayerIcons.PEN_TO_SQUARE)}
                                                onClick={() => {
                                                    setEditSectionOpen(true);
                                                    fetchLayerSection(props.layer.id);
                                                }}
                                                style={{
                                                    paddingLeft: "10px"
                                                }}/>
                                        </div>
                                    )
                                }
                                {
                                    (props.authToken ?? '') !== '' && (
                                        <div className="tooltip-container" data-title="Move Up">
                                            <FontAwesomeIcon 
                                                className="decrement-order"
                                                color="black"
                                                style={{
                                                    paddingLeft: "6px"
                                                }}
                                                icon={getFontawesomeIcon(FontAwesomeLayerIcons.UP_ARROW)}
                                                onClick={async() => {
                                                    await UpLayerSection(props.layer.id)
                                                    // fetchLayerSection(props.layer.id)
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
                                            style={{
                                                paddingLeft: "6px"
                                            }}
                                            icon={getFontawesomeIcon(FontAwesomeLayerIcons.DOWN_ARROW)}
                                            onClick={async() => {
                                                await DownLayerSection(props.layer.id)
                                                props.afterSubmit()
                                            }}
                                        />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </>
                )}
            </center>
            {
                layerIsOpen &&
                props.layer.groups.map((grp, idx) => (
                    <SectionLayerGroupComponent
                        authToken={props.authToken}
                        key={`section-layer-component-${idx}`}
                        activeLayers={props.activeLayers}
                        activeLayerCallback={props.activeLayerCallback}
                        layersHeader={props.layersHeader}
                        group={grp}
                        openWindow={props.openWindow}
                        beforeOpen={props.beforeOpen}
                        afterClose={props.afterClose}
                        sectionName={props.layer.id}
                        mapZoomCallback={props.mapZoomCallback}
                        fetchLayerGroupCallback={fetchLayerGroup}
                        editFormVisibleCallback={setEditOpen}
                        removeMapLayerCallback={props.removeMapLayerCallback}
                        afterSubmit={props.afterSubmit}/>
                ))
            }
            {
                layerIsOpen && (
                    <NewSectionLayerGroup
                        authToken={props.authToken}
                        beforeOpen={props.beforeOpen}
                        afterClose={props.afterClose}
                        sectionLayerId={props.layer.id}
                    ></NewSectionLayerGroup>
                )
            }
            {
                editOpen && (
                    <Modal
                        style={{
                            content: {
                                width: '30%',
                                right: '5px'
                            }
                        }}
                        isOpen={editOpen}
                        onRequestClose={() => {closeEdit();}}
                        contentLabel='Edit Layer Group'
                    >
                        {isLoading ? (
                            <Loader
                            center={true}/>
                            ) : (
                            <NewLayerGroupForm authToken={props.authToken} sectionLayerId={props.layer.id} layerGroup={layerGroup} afterSubmit={closeEdit}></NewLayerGroupForm>
                            )
                        }
                    </Modal>
                )
            }
        </>
    )
}

export default SectionLayerComponent;