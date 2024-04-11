import './DragBox.scss';
import { motion } from "framer-motion"
import { useEffect, useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

function DragBox({ children }) {

    const [isUpwards, setIsUpwards] = useState(true);
    const [current, setCurrent] = useState(0)
    const [previous, setPrevious] = useState(current)

    const direction = () => {
        if (current < previous) {
            setIsUpwards(false)
        }
        else {
            setIsUpwards(true)
        }
    }

    const handleDrag = (event, info) => {
        if (info.point.y !== current) {
            setPrevious(current)
            setCurrent(info.point.y)
            direction()
        }
    }

    return (
        <div className={`form-container`}>
            <div className='desktop-form'>
                {children}
            </div>

            <div className='mobile-form'>

                <div className='form-intial'>

                    <motion.div
                        className='sBox'
                        drag={'y'}
                        dragConstraints={{
                            top: -420,
                            bottom: 0
                        }}
                        onDrag={handleDrag}
                    >
                        <div className='fixedCircle'>
                            {isUpwards ? <IoIosArrowUp className='arrowIcon' /> : <IoIosArrowDown className='arrowIcon' />}
                        </div>
                        {children}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default DragBox