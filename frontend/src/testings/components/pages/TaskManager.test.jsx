import TaskManager from "@/components/pages/TaskManager";
import { getTaskContainers, getTeam, joinTeam } from "@/services/AxiosApi";
import { createEvent, fireEvent, renderWithProviders, screen, waitFor } from "@/testings/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import socket from "@/sockets/Socket";
import { DropFunc, SortContainer } from "@/assets/handlers/TaskHandler";

vi.mock('@/assets/handlers/TaskHandler', () => {
    return {
        DropFunc: vi.fn(),
        SortContainer: vi.fn((a) => a),
    }
})

vi.mock('@/services/AxiosApi', () => ({
    getTaskContainers: vi.fn(),
    getTeam: vi.fn().mockReturnValue(
        {
            team: {
                _id: 'c3cb',
                TeamName: 'testTeam',
                users: [
                    { _id: '72cb', name: 'userA' },
                    { _id: 'd6b5', name: 'userB' },
                    { _id: '769f', name: 'userC' }

                ],
            },
            user: {
                _id: '72cb',
                name: 'user A'
            }
        }
    )
}))

vi.mock("@/sockets/Socket", () => ({
    default: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
        connect: vi.fn(),
        disconnect: vi.fn(),
    }
}));

beforeAll(() => {
    waitFor(() => localStorage.setItem('teamToken', 'this-my-teamToken'))
})

afterEach(() => {
    getTaskContainers.mockReset()
    DropFunc.mockClear()
})

describe("testing taskManager component", () => {
    const container = [
        { _id: '0502', user: 'user A', tasks: [] },
        { _id: '0506', user: 'user B', tasks: [] },
        { _id: '050a', user: 'user C', tasks: [] }
    ]
    beforeEach(async () => {
        getTaskContainers.mockReturnValueOnce(container)
        renderWithProviders(<TaskManager />)
        await waitFor(() => getTeam())
        await waitFor(() => expect(getTaskContainers).toHaveBeenCalled())
    })

    test("cheking state of containers and newTask btn", async () => {
        expect(screen.getByText(/new task/)).toBeInTheDocument()
        expect(screen.getByText(/user a/i)).toBeInTheDocument()
        expect(screen.getByText(/user b/i)).toBeInTheDocument()
        expect(screen.getByText(/user c/i)).toBeInTheDocument()
    })

    test("check room join", () => {
        expect(socket.connect).toHaveBeenCalled()
        expect(socket.emit).toHaveBeenCalledWith('teamJoin', "c3cb")
    })

    test("create new task", async () => {
        const user = userEvent.setup()
        await user.click(screen.getByText(/new task/i))
        await user.type(screen.getByRole('textbox'), 'task A')
        await user.click(screen.getByRole('button'))

        expect(socket.emit).toHaveBeenCalledWith(
            'newTask',
            {
                index: 0,
                selfContId: "0502",
                title: "task A"
            }
            , "c3cb"
        )
    })


})

describe("testing drag and drop", () => {
    let container = [
        {
            _id: 'userA_Id',
            user: 'user A',
            tasks: [
                {
                    _id: 'taskA_Id',
                    title: 'task A',
                    index: 0,
                    updatedAt: '2024-05-14T04:07:36.429Z',

                },
                {
                    _id: 'taskB_Id',
                    title: 'task B',
                    index: 1,
                    updatedAt: '2024-05-14T04:07:36.427Z',

                }

            ]
        },
        { _id: 'userB_Id', user: 'user B', tasks: [] },
        { _id: 'userC_Id', user: 'user C', tasks: [] }
    ]
    beforeEach(async () => {
        getTaskContainers.mockReturnValueOnce(container)
        renderWithProviders(<TaskManager />)
        await waitFor(() => getTeam())
        await waitFor(() => expect(getTaskContainers).toHaveBeenCalled())
    })

    test("test dragStart and drop within container", async () => {

        fireEvent.dragStart(screen.getByText(/task A/i))
        fireEvent.drop(screen.getByText(/task B/i))

        expect(DropFunc).toHaveBeenCalledTimes(1).toHaveBeenCalledWith(
            {
                DragId: "userA_Id",
                DragTaskId: "taskA_Id",
                DropId: "userA_Id",
                DropTaskId: "taskB_Id",
                dragTaskIndex: 0,
                dropTaskIndex: 1,
            },
            "c3cb",
        )
    })

    test("test same drag and drop task", () => {

        fireEvent.dragStart(screen.getByText(/task A/i))
        fireEvent.drop(screen.getByText(/task A/i))
        expect(DropFunc).not.toHaveBeenCalled()
    })

    test("test drag and drop to external container", async () => {
        fireEvent.dragStart(screen.getByText(/task A/))
        const dropCont = screen.getByText(/user C/i);

        fireEvent.dragOver(dropCont, (e) => e.preventDefault())
        fireEvent.drop(dropCont)
    })



})
