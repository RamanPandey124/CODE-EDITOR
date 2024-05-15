import socket from "@/sockets/Socket";

export const SortContainer = container => {
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


export const DropFunc = (taskData, teamId) => {
    let { DropId, DropTaskId, dropTaskIndex, DragId, DragTaskId, dragTaskIndex } = taskData

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
    socket.emit('dropTask', { DropId, DragId, DropTaskId, DragTaskId, dropTaskIndex, dragTaskIndex }, teamId)

}