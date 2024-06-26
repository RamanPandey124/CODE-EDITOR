import { useEffect, useState } from "react"
import Modal from "../singleUse/Modal"
import InputBox from './InputBox.jsx';
import { useFormik } from "formik";
import { joinTeamSchema } from "@/assets/yup files/RegisterYup.js";
import { joinTeam } from "@/services/AxiosApi"
import Loader from "../singleUse/Loader";


const JoinTeam = ({ isModalOpen, onClose, name = "", current }) => {
    const [loading, setLoading] = useState(false)


    const initialValues = {
        name,
        password: ''
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues } = useFormik({
        initialValues,
        validationSchema: joinTeamSchema,
        onSubmit: async (values, action) => {
            action.resetForm()
            setLoading(true)
            const isJoin = await joinTeam(values)
            if (isJoin) {
                current ? window.location.reload() : window.location.replace('/editor')
            }
            setLoading(false)
        }
    })

    useEffect(() => {
        return () => {
            setValues(initialValues)
        }
    }, [])

    return (

        <Modal isOpen={isModalOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <h2>Join a team</h2>
                <InputBox
                    focus
                    name={'name'}
                    placeholder={'Team name'}
                    values={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.name}
                    touched={touched.name}
                />
                <InputBox
                    type={'password'}
                    name={'password'}
                    placeholder={'password'}
                    values={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.password}
                    touched={touched.password}
                />
                <button
                    className={`createbtn`}
                    disabled={loading}
                    type='submit'
                >
                    {loading ? <Loader /> : 'Join'}
                </button>
            </form>
        </Modal>
    )
}

export default JoinTeam