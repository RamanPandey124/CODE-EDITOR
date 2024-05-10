import Home from "@/components/pages/Home"
import { configure, renderWithProviders, screen, waitFor, waitForElementToBeRemoved } from "@/testings/utils/test-utils"
import { test, describe, expect, vi } from "vitest"
import { userProfile } from "@/services/AxiosApi"
import Teams from "@/components/singleUse/Teams"
import userEvent from "@testing-library/user-event"

vi.mock('@/services/AxiosApi', () => ({
    userProfile: vi.fn().mockReturnValueOnce(
        {
            _id: 'userId',
            name: 'testUser',
            email: 'testUser@email.com'
        }
    )
}))


describe("testing Home component", () => {
    test("check is userName display", async () => {
        renderWithProviders(<Home />)
        expect(screen.getByTestId('Loader')).toBeInTheDocument()

        await waitFor(() => expect(userProfile).toHaveBeenCalled())

        expect(screen.getByText('testUser')).toBeInTheDocument()
        expect(screen.getByText(/testUser@email.com/)).toBeInTheDocument()
    })
})


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
