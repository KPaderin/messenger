import Modal from "react-modal"
import React from "react"

export const ModalWindow = ({
    isOpen,
    classname,
    children,
    onRequestClose,
}) => {
    return (
        <Modal
            style={customStyles}
            className={classname}
            isOpen={isOpen}
            ariaHideApp={false}
            onRequestClose={onRequestClose}
        >
            {children}
        </Modal>
    )
}

const customStyles = {
    overlay: {
        backdropFilter: "blur(2px)",
        backgroundColor: "rgba(160, 147, 147, 0.0)"
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#FFF",
        border: "none",
    },
}
