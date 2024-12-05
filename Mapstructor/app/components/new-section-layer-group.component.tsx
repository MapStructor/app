import { useContext, useEffect, useState } from "react";
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeLayerIcons } from "../models/font-awesome.model";
import { getFontawesomeIcon } from "../helpers/font-awesome.helper";
import NewLayerGroupForm from "./forms/LayerGroupForm";

type LayerFormButtonProps = {
    sectionLayerId: string,
    beforeOpen: () => void,
    afterClose: () => void,
    authToken: string
}

const NewSectionLayerGroup = (props: LayerFormButtonProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const openWindow = () => {
        props.beforeOpen()
        setIsOpen(true)
    }

    const closeWindow = () => {
        props.afterClose()
        setIsOpen(false)
    }

    // Necessary for the Modal to know what to hide
    Modal.setAppElement('#app-body-main');

    return (
        <>
            {
                (props.authToken ?? '') !== '' && (
                    <div style={{paddingTop: '5px', paddingLeft: '15px', paddingRight: '10px', textAlign: 'center'}}>
                        <button id='post-button' onClick={openWindow}>
                            <FontAwesomeIcon icon={getFontawesomeIcon(FontAwesomeLayerIcons.PLUS_SQUARE, true)}></FontAwesomeIcon> New Group
                        </button>
                    </div>
                )
            }
            <Modal
                style={{
                    content: {
                        width: '30%',
                        right: '5px'
                    }
                }}
                isOpen={isOpen}
                onRequestClose={closeWindow}
                contentLabel='New Group'
            >
                <NewLayerGroupForm authToken={props.authToken} sectionLayerId={props.sectionLayerId} afterSubmit={closeWindow}></NewLayerGroupForm>
            </Modal>
        </>
    )
}

export default NewSectionLayerGroup;