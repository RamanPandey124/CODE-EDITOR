import { CounterContext } from "@/contextApi/Context"
import { useContext } from "react"
import { MdDelete } from "react-icons/md";
import { handleContainerInstance } from "@/assets/handlers/TaskHandler";

const TaskContainer = ({ value, onDragStart, onDrop, onDelete }) => {
    const { state } = useContext(CounterContext)

    return (
        <div>
            <p>{value?.user}</p>

            <div
                id={value._id}
                className="original"
                onDragOver={handleContainerInstance}
                onDrop={() => { !value.tasks.length && onDrop({ DropId: value._id }) }}
            >
                {value?.tasks?.map((task, taskIndex) => {
                    return < div
                        id={task._id}
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

export default TaskContainer