import React, { useState } from 'react';
import Modal from 'react-modal';
import LayerForm from '../LayerForm';

type LayerFormButtonProps = {
    beforeOpen: () => void,
    afterClose: () => void
}

const LayerFormButton = (props: LayerFormButtonProps) => {
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
                marginLeft: '3px',
                marginRight: '5px'

            }} onClick={openWindow}>
                New Layer
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
                contentLabel='New Layer'
            >
                <LayerForm></LayerForm>
            </Modal>
        </>
    )
}

export default LayerFormButton;