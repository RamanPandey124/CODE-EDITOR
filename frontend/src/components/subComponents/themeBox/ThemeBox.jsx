import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import "./ThemeBox.scss";
import { dark, light } from "../../../redux/slices/themSlice";
import { useDispatch } from "react-redux";


export default function ThemeBox() {
    const [isOn, setIsOn] = useState(false);
    const dispatch = useDispatch()
    const onOff = isOn ? 'switchOn' : 'switchOff'

    const toggleSwitch = () => {
        setIsOn(!isOn)
        if (isOn) {
            dispatch(dark())
        } else {
            dispatch(light())
        }
    };

    return (
        <div className={`switch ${onOff}`} onClick={toggleSwitch}>
            {/* <div className="switch" data-isOn={isOn} onClick={toggleSwitch}> */}
            <motion.div className="handle" layout transition={spring} />
        </div>
    );
}

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};