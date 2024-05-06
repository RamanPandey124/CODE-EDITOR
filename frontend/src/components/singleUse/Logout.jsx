import '/public/sass/singleuse/Logout.scss';
import { toast } from 'react-toastify'
import { IoMdLogOut } from "react-icons/io";
import Modal from './Modal';
import { useState } from 'react';


const Logout = () => {
    const [isModalOpen, setModalOpen] = useState(false)

    function handleLogout() {
        window.localStorage.clear()
        toast.error('Logout')
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }
    return (
        <div className='toLogout actionBackground'>
            <div onClick={() => { setModalOpen(true) }}>
                <p>logout <IoMdLogOut className='headerIcon' /></p>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(!isModalOpen)}>
                <p>Do you want to logout</p>
                <button className='logoutBtn' onClick={handleLogout}>Logout</button>
            </Modal>
        </div>
    )
}

export default Logout