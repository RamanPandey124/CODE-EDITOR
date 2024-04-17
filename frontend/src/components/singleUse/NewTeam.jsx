import { useState } from "react"
import Modal from "./Modal"
import InputBox from './../reuseable/InputBox.jsx';
import { useFormik } from "formik";
import { createTeamSchema, joinTeamSchema } from "@/assets/yup files/RegisterYup.js";
import { createTeam, joinTeam } from "@/services/AxiosApi"
import API from "@/services/API";

const NewTeam = ({ title, className, cpwd = false }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const nameChange = e => {
        console.log(e.target.value)
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: cpwd ? createTeamSchema : joinTeamSchema,
        onSubmit: async (values, action) => {
            action.resetForm()
            setLoading(true)
            await cpwd ? createTeam(values) : joinTeam(values)
            setLoading(false)
        }
    })



    return (
        <div >
            <div className={className} onClick={() => setIsModalOpen(true)}>
                <p >{title}</p>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <h2>{title}</h2>
                    <InputBox
                        name={'name'}
                        placeholder={'Team name'}
                        values={values.name}
                        onChange={(e) => {
                            handleChange(e);
                            cpwd && nameChange(e)
                        }}
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
                    {cpwd && <InputBox
                        type={'password'}
                        name={'confirmPassword'}
                        placeholder={'Confirm Password'}
                        values={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.confirmPassword}
                        touched={touched.confirmPassword}
                    />}
                    <button
                        className={`createbtn`}
                        disabled={loading}
                        type='submit'
                    >{loading ? 'loading...' : title}</button>
                </form>
            </Modal>
        </div >
    )
}

export default NewTeam