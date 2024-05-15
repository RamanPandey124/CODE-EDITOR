import "public/sass/pages/TaskManager.scss"
import { useContext, useEffect, useState } from "react"
import WorkspaceWrapper from "../reuseable/WorkspaceWrapper"
import { CounterContext } from "@/contextApi/Context"
import { getTaskContainers } from "@/services/AxiosApi"
import socket from "@/sockets/Socket"
import { useFormik } from "formik"
import InputBox from "../reuseable/InputBox"
import Modal from "../singleUse/Modal"
import { IoIosCreate } from "react-icons/io";
import TaskContainer from "../singleUse/TaskContainer"
import { DropFunc, SortContainer } from "@/assets/handlers/TaskHandler"



const TaskManager = () => {
    const { state } = useContext(CounterContext)
    const [containers, setContainer] = useState([])
    const [selfContId, setSelfContId] = useState(null)
    const [dragElement, setDragElement] = useState(null)
    const [isNew, setNew] = useState(false)
    const postData = {
        teamId: state.team?._id,
        userIds: state.team?.users
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            title: ""
        },
        onSubmit: async (values, action) => {
            let index = containers.filter((a) => a._id === selfContId)[0].tasks.length
            socket.emit('newTask', { ...values, selfContId, index }, postData.teamId)
            setNew(false)
            action.resetForm()
        }
    })

    function handleDrop(elem) {
        if (elem.DropTaskId === dragElement.DragTaskId) { return }
        DropFunc({ ...elem, ...dragElement }, postData.teamId)
    }

    async function containerData() {
        const contArr = await getTaskContainers(postData)
        const selfCont = contArr.filter(obj => obj.user === state.user.name)[0];
        setSelfContId(selfCont._id)
        setContainer(SortContainer(contArr))
    }

    function handleStart(elem) {
        setDragElement(elem)
    }

    function handleDelete(elem) {
        socket.emit('deleteTask', elem, postData.teamId)
    }

    useEffect(() => {
        socket.on('newTask', (container) => {
            setContainer(SortContainer(container))
        })

        return (() => {
            socket.off('dropTask')
            socket.off('deleteTask')
            socket.off('newTask')
        })
    }, [dragElement])

    useEffect(() => {
        socket.connect()
        if (state.team) {
            containerData()
            socket.emit("teamJoin", state.team._id)
        }
        return (() => {
            socket.disconnect()
            socket.off('teamJoin')
        })

    }, [state.team])


    return (
        < WorkspaceWrapper >
            <div className="createTaskForm">
                <h3 className="newTask" onClick={() => setNew(true)}><IoIosCreate /> new task</h3>
                <Modal key={state.team?._id} isOpen={isNew} onClose={() => setNew(false)}>
                    <form onSubmit={handleSubmit}>
                        <InputBox
                            name={'title'}
                            focus
                            values={values.name}
                            placeholder={'title'}
                            onChange={handleChange}
                            errors={errors.name}
                            touched={touched.name}
                            onBlur={handleBlur}
                        />
                        <button
                            className={`createbtn`}
                            type='submit'>submit</button>
                    </form>
                </Modal>
            </div>
            <div className="tasksWrapper">
                <div className="Tasks-container">
                    {containers?.map((value, index) => (
                        <TaskContainer
                            key={index}
                            value={value}
                            onDragStart={handleStart}
                            onDrop={handleDrop}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </WorkspaceWrapper >
    )
}


export default TaskManager
