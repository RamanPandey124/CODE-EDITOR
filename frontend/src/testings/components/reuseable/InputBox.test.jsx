import InputBox from "@/components/reuseable/InputBox";
import { describe, expect, test, vi } from "vitest";
import { screen, renderWithProviders, configure, fireEvent } from "@/testings/utils/test-utils";
import userEvent from "@testing-library/user-event";


describe("testing InputBox component", () => {
    configure({ testIdAttribute: 'id' })

    test("is input element present", () => {
        renderWithProviders(<InputBox name="email" type="text" placeholder="email" />)
        const input = screen.getByPlaceholderText("email")
        expect(input).toBeInTheDocument()
        expect(input).toHaveAttribute('name', "email")
        expect(input).toHaveAttribute('type', "text")
    })

    test("check input-type and password icon", async () => {
        const user = userEvent.setup()
        renderWithProviders(<InputBox type="password" placeholder={'password'} />)

        const input = screen.getByPlaceholderText("password")
        expect(input).toHaveAttribute('type', "password")

        const iconSpan = screen.getByTestId('passIconSpan')
        const passIcon = screen.getByTestId('passIcon')

        expect(iconSpan).toBeInTheDocument()
        expect(passIcon).toBeInTheDocument()

        await user.click(iconSpan)

        const textIcon = screen.queryByTestId("textIcon")
        expect(input).toHaveAttribute('type', "text")
        expect(passIcon).not.toBeInTheDocument()
        expect(textIcon).toBeInTheDocument()
    })

    test('check error on touched', () => {
        renderWithProviders(<InputBox errors="test error" touched={true} />)

        expect(screen.getByText('test error')).toBeInTheDocument()
    })

    test('check input focus', () => {
        renderWithProviders(<InputBox focus />)
        expect(screen.getByRole('textbox')).toHaveFocus()
    })
})
