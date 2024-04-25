import "public/sass/pages/TaskManager.scss"
import { useState } from "react"
import WorkspaceWrapper from "../reuseable/WorkspaceWrapper"

const cont = [
    {
        id: 'c1',
        child: [
            { id: 'c1A', title: 'This is c1A' },
            { id: 'c1B', title: 'This is c1B' },
            { id: 'c1C', title: 'This is c1C' },
        ]
    },
    {
        id: 'c2',
        child: [
            // { id: 'c2A', title: 'This is c2A' },
            { id: 'c2A', title: 'This is c2B' },
            // { id: 'c2A', title: 'This is c2C' },
        ]
    },
    {
        id: 'c3',
        child: [
            // { id: 'c3A', title: 'This is c3A' },
            { id: 'c3B', title: 'This is c3B' },
            { id: 'c3C', title: 'This is c3C' },
        ]
    }
]



const TaskManager = () => {
    const [containers, setContainer] = useState(cont)
    const [dragElement, setDragElement] = useState(null)

    function handleStart(elem) {
        setDragElement(elem)
    }

    function handleDrop(elem) {
        if (dragElement != null) {
            const element = containers[dragElement.DragIndex]?.child.splice(dragElement.childIndex, 1)
            containers[elem]?.child.push(...element)
        }
        setContainer([...containers])
    }

    return (
        <WorkspaceWrapper>
            <div className="Tasks-container">
                {containers.map((value, index) => (
                    <TaskContainer
                        key={index}
                        value={value}
                        DragIndex={index}
                        onDragStart={handleStart}
                        onDrop={handleDrop}
                    />
                ))}
            </div>
        </WorkspaceWrapper>
    )
}

const TaskContainer = ({ value, DragIndex, onDragStart, onDrop }) => {

    return (
        <div>
            <p>ramanpandey</p>
            <div className="original" onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(DragIndex)}
            >
                {value.child?.map((child, childIndex) => (
                    <div
                        key={childIndex}
                        className="child"
                        draggable
                        onDragStart={() => onDragStart({ DragIndex, childIndex })}
                    >
                        {child.title}
                    </div>
                ))}
            </div>
        </div>
    )

}



export default TaskManager
