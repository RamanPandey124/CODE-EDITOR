import '/public/sass/singleuse/Modal.scss';
import React from 'react';
import { MdCancel } from "react-icons/md";
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <MdCancel className="modal-close" onClick={onClose} />
                {children}
            </div>
        </div>
    );
};

export default Modal;