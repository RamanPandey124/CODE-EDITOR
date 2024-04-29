import "public/sass/pages/TaskManager.scss"
import { useContext, useEffect, useState } from "react"
import WorkspaceWrapper from "../reuseable/WorkspaceWrapper"
import { CounterContext } from "@/contextApi/Context"
import { getTaskContainers } from "@/services/AxiosApi"
import socket from "@/sockets/Socket"


const TaskManager = () => {

    const { state } = useContext(CounterContext)
    const [containers, setContainer] = useState([])
    const [text, setText] = useState('')
    const [selfContainer, setSelfContainer] = useState({})
    const [dragElement, setDragElement] = useState(null)
    const postData = {
        teamId: state.team?._id,
        userIds: state.team?.users
    }

    async function containerData() {
        const contArr = await getTaskContainers(postData)
        const selfCont = contArr.filter(obj => obj.user === state.user.name)[0];
        const selfIndex = contArr.indexOf(selfCont)
        setSelfContainer({ selfIndex, selfContId: selfCont._id })
        setContainer(contArr)
    }

    function handleInput(e) {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const text = form.get('title')
        socket.emit('newTask', { text, ...selfContainer }, postData.teamId)
        form.set('title', '')
    }

    function handleStart(elem) {
        setDragElement(elem)
    }

    function handleDrop(elem) {
        if (dragElement != null && dragElement.DragId != elem.DropId) {
            socket.emit('dropTask', { ...dragElement, ...elem }, postData.teamId)
        }
    }

    useEffect(() => {
        socket.on('newTask', (container) => {
            setContainer(container)
        })
        socket.on('dropTask', (container) => {
            setContainer(container)
        })
    }, [text, dragElement])

    useEffect(() => {
        socket.connect()
        if (state.team) {
            containerData()
            socket.emit("teamJoin", state.team._id)
        }

    }, [state.team])



    return (
        < WorkspaceWrapper >
            <div>
                <form onSubmit={handleInput}>
                    <input type="text" name="title" defaultValue={""} />
                    <button type="submit">submit</button>
                </form>
                <div className="Tasks-container">
                    {containers?.map((value, index) => (
                        <TaskContainer
                            key={index}
                            value={value}
                            DragIndex={index}
                            onDragStart={handleStart}
                            onDrop={handleDrop}
                        />
                    ))}
                </div>
            </div>
        </WorkspaceWrapper >
    )
}

const TaskContainer = ({ value, DragIndex, onDragStart, onDrop }) => {

    return (
        <div>
            <p>{value?.user}</p>

            <div
                className="original"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop({ DropIndex: DragIndex, DropId: value._id })}
            >
                {value?.tasks.length ? value.tasks.map((task, taskIndex) => (
                    < div
                        key={taskIndex}
                        className="child"
                        draggable
                        onDragStart={() => onDragStart({ DragIndex, taskIndex, DragId: value._id, taskId: task._id })}
                    >
                        {task.text}
                    </div >
                )) : null}
            </div>
        </div>
    )

}



export default TaskManager


















// function handleStart(elem) {
//     setDragElement(elem)
// }

// function handleDrop(elem) {
//     if (dragElement != null) {
//         const element = containers[dragElement.DragIndex]?.child.splice(dragElement.childIndex, 1)
//         containers[elem]?.child.push(...element)
//     }
//     setContainer([...containers])
// }