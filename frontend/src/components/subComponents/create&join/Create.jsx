import './Create.scss'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { create } from '../../../redux/slices/inputSlice';

const items = [
    { _id: '1', title: 'Create Team', cpwd: true, placeholder: 'Team Name', name: 'name' },
    { _id: '2', title: 'Join Team', placeholder: 'Team ID' }
]

const Create = () => {
    const dispatch = useDispatch()

    return (
        <div className="create">
            {items.map(item => (
                <motion.div
                    key={item._id}
                    layoutId={item.id}
                    onClick={() => dispatch(create(item))}
                    className="createbtn"
                >
                    <motion.h3>{item.title}</motion.h3>
                </motion.div>
            ))}
        </div>
    );
};

export default Create;
