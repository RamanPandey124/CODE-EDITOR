import TaskManager from "@/components/pages/TaskManager";
import { getTaskContainers } from "@/services/AxiosApi";
import { act, fireEvent, renderWithProviders, screen, waitFor } from "@/testings/utils/test-utils";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import socket from "@/sockets/Socket";
import { handleContainerInstance } from "@/assets/handlers/TaskHandler";

vi.mock('@/assets/handlers/TaskHandler', async (importOriginal) => {
    const actual = await importOriginal()

    return {
        ...actual,
        handleContainerInstance: vi.fn((e) => e.preventDefault())
    }
})

vi.mock("@/sockets/Socket", () => {
    return {
        default: {
            on: vi.fn(),
            off: vi.fn(),
            connect: vi.fn(),
            disconnect: vi.fn(),
            emit: vi.fn()
        }
    }
})

let cont = [
    {
        _id: '662b3f2f4cb9d0a784020502',
        user: 'raman pandey',
        tasks: []
    },
    {
        _id: '662b3f2f4cb9d0a784020506',
        user: 'harsh',
        tasks: []
    },
    {
        _id: '662b3f2f4cb9d0a78402050a',
        user: 'ankit',
        tasks: []
    }
]

beforeAll(() => {
    waitFor(() => localStorage.setItem('teamToken', "thisisteamtoken"))
})

afterAll(() => vi.clearAllMocks())

afterEach(() => {
    socket.on.mockClear()
    socket.emit.mockClear()
})

describe("manager component", () => {

    test("state changing on socket.io listner", async () => {
        renderWithProviders(<TaskManager />)
        await act(() => getTaskContainers())
        expect(screen.getByText(/task A/i)).toBeInTheDocument()

        expect(socket.on.mock.calls[0][0]).toEqual('newTask')
        await waitFor(() => socket.on.mock.calls[0][1](cont))
        expect(screen.queryByText(/task A/i)).not.toBeInTheDocument()
    })

    test("drag and drop in interContainer", async () => {
        renderWithProviders(<TaskManager />)
        await act(() => getTaskContainers())

        fireEvent.dragStart(screen.getByText(/task A/i))
        fireEvent.drop(screen.getByText(/task D/i))

        expect(socket.emit).toHaveBeenCalledWith(
            "dropTask",
            {
                "DragId": "662b3f2f4cb9d0a784020506",
                "DragTaskId": "66433cb0502e89a2d28849de",
                "DropId": "662b3f2f4cb9d0a78402050a",
                "DropTaskId": "66433cb1502e89a2d28849e2",
                "dragTaskIndex": 0,
                "dropTaskIndex": 0,
            },
            "661ba24e9e14e01a163ac3cb")
    })

    test("drag and drop in same task", async () => {
        renderWithProviders(<TaskManager />)
        await act(() => getTaskContainers())

        fireEvent.dragStart(screen.getByText(/task A/i))
        fireEvent.drop(screen.getByText(/task A/i))

        expect(socket.emit).not.toHaveBeenCalledWith('dropTask', expect.any(Object), expect.any(String))
    })

    test("test drag and drop to external container ", async () => {
        renderWithProviders(<TaskManager />)
        await act(() => getTaskContainers())

        fireEvent.dragStart(screen.getByText(/task A/i))

        const dropCont = screen.getByTestId("662b3f2f4cb9d0a78402050a")
        fireEvent.dragOver(dropCont)
        expect(handleContainerInstance).toHaveBeenCalled()
        fireEvent.drop(dropCont)

        // expect(socket.emit).toHaveBeenCalledWith()

    })

})


