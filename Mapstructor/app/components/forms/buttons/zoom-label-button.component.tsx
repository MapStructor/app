import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import MapForm from '../MapForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFontawesomeIcon } from '@/app/helpers/font-awesome.helper';
import { FontAwesomeLayerIcons } from '@/app/models/font-awesome.model';
import ZoomLabelForm from '../ZoomLabelForm';

type ZoomLabelButtonProps = {
    beforeOpen: () => void,
    afterClose: () => void,
    authToken?: string
}

const ZoomLabelButton = (props: ZoomLabelButtonProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openWindow = () => {
        props.beforeOpen()
        setIsOpen(true)
    }

    const closeWindow = () => {
        props.afterClose()
        setIsOpen(false)
    }

    return (
        <>
            {
                (props.authToken ?? '') !== '' && (
                    <button
                        onClick={openWindow} id="zoom-world">
                            <FontAwesomeIcon icon={getFontawesomeIcon(FontAwesomeLayerIcons.NOTES_MEDICAL)}></FontAwesomeIcon>
                            <strong> Zoom Labels</strong>
                    </button>
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
                contentLabel='New Map'
            >
                <ZoomLabelForm></ZoomLabelForm>
            </Modal>
        </>
    )
}

export default ZoomLabelButton;