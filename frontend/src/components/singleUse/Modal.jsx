import '/public/sass/singleuse/Modal.scss';
import React from 'react';
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';

const Modal = ({ isOpen, onClose, children }) => {
    const { modalBg } = useSelector((state) => state.theme)
    if (!isOpen) return null;

    return (
        <div className={`modal-overlay ${modalBg}`}>
            <div className="modal">
                <MdCancel className="modal-close" onClick={onClose} />
                {children}
            </div>
        </div>
    );
};

export default Modal;
