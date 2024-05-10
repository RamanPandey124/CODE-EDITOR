import { useEffect, useState } from "react"
import Modal from "./Modal"
import InputBox from './../reuseable/InputBox.jsx';
import { useFormik } from "formik";
import { createTeamSchema } from "@/assets/yup files/RegisterYup.js";
import { createTeam } from "@/services/AxiosApi"
import socket from "@/sockets/Socket";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { MdCreateNewFolder } from "react-icons/md";


const CreateTeam = ({ className, title }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [isTeamExist, setTeamExist] = useState(false)
    const navigate = useNavigate()

    const nameChange = e => {
        socket.emit('isTeamExist', e.target.value)
        socket.on('teamFound', (isTeam) => { isTeam == 1 ? setTeamExist(true) : setTeamExist(false) })
    }

    const initialValues = {
        name: '',
        password: '',
        confirmPassword: ''
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues } = useFormik({
        initialValues,
        validationSchema: createTeamSchema,
        onSubmit: async (values, action) => {
            action.resetForm()
            setLoading(true)
            const isCreate = await createTeam(values)
            { isCreate && navigate('/editor') }
            setTeamExist(false)
            setLoading(false)
        }
    })

    useEffect(() => {
        socket.connect()
        return () => {
            socket.disconnect()
        }
    }, [])
    useEffect(() => {
        return () => {
            setValues(initialValues)
            setTeamExist(false)
        }
    }, [isModalOpen])

    return (
        <div >
            <div className={className} onClick={() => setIsModalOpen(true)}>
                <p><MdCreateNewFolder className="headerIcon" /> {title}</p>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <h2>Create new team</h2>
                    <InputBox
                        focus
                        name={'name'}
                        placeholder={'Team name'}
                        values={values.name}
                        onChange={(e) => { handleChange(e); nameChange(e) }}
                        onBlur={handleBlur}
                        errors={errors.name}
                        touched={touched.name}
                    />
                    {isTeamExist && <p style={{ color: 'red', position: 'relative', bottom: '12px', height: '10px', width: '12rem' }}>team already exist!</p>}
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
                    <InputBox
                        type={'password'}
                        name={'confirmPassword'}
                        placeholder={'Confirm Password'}
                        values={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.confirmPassword}
                        touched={touched.confirmPassword}
                    />
                    <button
                        className={`createbtn`}
                        disabled={loading || isTeamExist}
                        type='submit'
                    >
                        {loading ? <Loader /> : 'create'}
                    </button>
                </form>
            </Modal>
        </div >
    )
}

export default CreateTeam