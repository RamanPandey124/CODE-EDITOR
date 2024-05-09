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
import { MdDelete } from "react-icons/md";



const TaskManager = () => {
    const [count, setCount] = useState(true)
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
            socket.emit('newTask', { ...values, selfContId }, postData.teamId)
            setNew(false)
            action.resetForm()
        }
    })

    function SortContainer(container) {
        for (let value of container) {
            let tasks = value.tasks
            tasks = tasks.sort((a, b) => {
                if (a.index !== b.index) {
                    return a.index - b.index
                }
                return new Date(a.updatedAt) - new Date(b.updatedAt);
            })

            value.tasks = tasks
        }
        return container
    }

    function handleDrop(elem) {
        let { DropId, DropTaskId, dropTaskIndex } = elem
        let { DragId, DragTaskId, dragTaskIndex } = dragElement

        if (dropTaskIndex - dragTaskIndex == 1 || dropTaskIndex - dragTaskIndex == -1) {
            let index = dropTaskIndex
            dropTaskIndex = dragTaskIndex
            dragTaskIndex = index
        }
        else if (!dropTaskIndex) {
            dragTaskIndex = 0
        }
        else {
            dragTaskIndex = dropTaskIndex
            dropTaskIndex += 1
        }

        socket.emit('dropTask', { DropId, DragId, DropTaskId, DragTaskId, dropTaskIndex, dragTaskIndex }, postData.teamId)
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
            socket.on('deleteTask')
            socket.off('newTask')
        })
    }, [dragElement])

    useEffect(() => {
        socket.connect()
        if (state.team && count) {
            containerData()
            socket.emit("teamJoin", state.team._id)
            setCount(false)
        }
        return (() => {
            socket.off('teamJoin')
            setCount(true)
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

const TaskContainer = ({ value, onDragStart, onDrop, onDelete }) => {
    const { state } = useContext(CounterContext)

    return (
        <div>
            <p>{value?.user}</p>

            <div
                className="original"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => { !value.tasks.length && onDrop({ DropId: value._id }) }}
            >
                {value?.tasks?.map((task, taskIndex) => {
                    return < div
                        key={taskIndex}
                        className="child"
                        draggable
                        onDragStart={() => onDragStart({ DragId: value._id, DragTaskId: task._id, dragTaskIndex: taskIndex })}
                        onDrop={() => onDrop({ DropId: value._id, DropTaskId: task._id, dropTaskIndex: taskIndex })}
                    >

                        <div className="taskTitle">{task.title}</div>

                        {state.user?.name === value?.user &&
                            <div>
                                <MdDelete className="taskIcon" onClick={() => onDelete({ taskId: task._id, contId: value._id })} />
                            </div>}
                    </div >
                })}
            </div>
        </div>
    )

}



export default TaskManager











