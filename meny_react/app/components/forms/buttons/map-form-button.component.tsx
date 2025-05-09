import React, { useState } from 'react';
import Modal from 'react-modal';
import MapForm from '../MapForm';

type MapFormButtonProps = {
    beforeOpen: () => void,
    afterClose: () => void
}

const MapFormButton = (props: MapFormButtonProps) => {
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
            <a style={{
                border: '3px solid black',
                padding: '5px',
                marginTop: '10px',

            }} onClick={openWindow}>
                New Map
            </a>
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
                <MapForm></MapForm>
            </Modal>
        </>
    )
}

export default MapFormButton;