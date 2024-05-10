import { renderWithProviders, screen } from "@/testings/utils/test-utils"
import { test, describe, expect, vi } from "vitest"
import Teams from "@/components/singleUse/Teams"
import userEvent from "@testing-library/user-event"

describe("testing Teams component", () => {
    const user = userEvent.setup()
    const teams = [
        {
            _id: '661b',
            name: 'dummyTeam',
        },
        {
            _id: 'c3d0',
            name: 'sampleTeam',
        }]

    test("check team cards display", () => {
        renderWithProviders(<Teams teamList={teams} />)
        expect(screen.getByText('dummyTeam')).toBeInTheDocument()
        expect(screen.getByText('sampleTeam')).toBeInTheDocument()
    })

    test("check searching team", async () => {
        renderWithProviders(<Teams teamList={teams} />)
        const faSearch = screen.getByTestId("faSearch")
        await user.click(faSearch)

        expect(screen.queryByTestId("faSearch")).not.toBeInTheDocument()
        expect(screen.getByTestId(/faSearchminus/i)).toBeInTheDocument()

        await user.type(screen.getByRole('textbox'), 'dummy')

        expect(screen.queryByText(/sample/)).not.toBeInTheDocument()

    })
})
