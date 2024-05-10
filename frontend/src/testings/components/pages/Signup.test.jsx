import { afterEach, beforeEach, expect, vi } from "vitest"
import { configure, fireEvent, renderWithProviders, screen, waitFor } from "@/testings/utils/test-utils"
import Signup from "@/components/pages/Signup"
import userEvent from "@testing-library/user-event"
import { userSignup } from "@/services/AxiosApi"


vi.mock('@/services/AxiosApi', () => ({
    userSignup: vi.fn(),
}));

describe("testing signup component", () => {

    test("check signup form", async () => {

        const user = userEvent.setup()
        renderWithProviders(<Signup />)
        const signupBtn = screen.getByRole('button')

        await user.type(screen.getByPlaceholderText('Username'), "test")
        await user.type(screen.getByPlaceholderText('Email'), "test@gmail.com")
        await user.type(screen.getByPlaceholderText('Password'), "testing")
        await user.type(screen.getByPlaceholderText('Confirm Password'), "testing")
        await user.click(signupBtn)

        expect(userSignup).toHaveBeenCalledWith({ name: 'test', email: 'test@gmail.com', password: 'testing', confirmPassword: 'testing' })

    })
})