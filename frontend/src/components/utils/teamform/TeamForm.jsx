import './TeamForm.scss'
import InputBox from './../inputbox/InputBox.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik'
import { createTeamSchema, joinTeamSchema } from '../../../assets/yup files/RegisterYup.js';
import { MdCancel } from "react-icons/md";
import { remove } from '../../../redux/slices/inputSlice.js';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { createTeam, joinTeam } from '../../../redux/actions/teamAction.js';
import useSignIn from 'react-auth-kit/hooks/useSignIn'


const TeamForm = () => {
    const { theme } = useSelector((state) => state.theme)
    const { _id, title, value, cPwd, placeholder } = useSelector((state) => state.input)
    const dispatch = useDispatch()
    const signIn = useSignIn()

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues } = useFormik({
        initialValues: {
            _id: value || '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: cPwd ? createTeamSchema : joinTeamSchema,
        onSubmit: (values, action) => {
            const { _id, password } = values
            if (cPwd) {
                const createData = { name: _id, password }
                dispatch(createTeam(createData))
            }
            else {
                const joinData = { _id, password }
                dispatch(joinTeam(joinData))
            }
            action.resetForm()
        }
    })

    useEffect(() => {
        if (value != null) {
            setValues(values => ({
                ...values,
                _id: value
            }))
        }
        return () => {
            setValues({
                _id: '',
                password: '',
                confirmPassword: ''
            })
        }

    }, [value])

    return (
        <div className={`teamform ${!_id && 'noneCont'}`} >
            {_id &&
                <motion.div className={`Tform ${theme}`} layoutId={_id}>
                    <MdCancel className='mdIcon' onClick={() => dispatch(remove())} />
                    <h2>{title}</h2>
                    <form onSubmit={handleSubmit}>
                        <InputBox
                            name={'_id'}
                            placeholder={placeholder}
                            values={values._id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errors={errors._id}
                            touched={touched._id}

                        />
                        <InputBox
                            type={'password'}
                            name={'password'}
                            placeholder={'Password'}
                            values={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errors={errors.password}
                            touched={touched.password}
                        />

                        {cPwd && <InputBox
                            type={'password'}
                            name={'confirmPassword'}
                            placeholder={'Confirm Password'}
                            values={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errors={errors.confirmPassword}
                            touched={touched.confirmPassword}
                        />}
                        <input className={`signbtn`} type='submit' value={cPwd ? 'Create' : 'Join'} />
                    </form>
                </motion.div>
            }
        </div>
    )
}

export default TeamForm