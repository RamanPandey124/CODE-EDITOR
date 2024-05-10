import Home from "@/components/pages/Home"
import { act, renderWithProviders, screen, waitFor } from "@/testings/utils/test-utils"
import { test, describe, expect, vi, beforeAll, beforeEach, afterEach } from "vitest"
import { userProfile } from "@/services/AxiosApi"


vi.mock('@/services/AxiosApi', () => ({
    userProfile: vi.fn().mockReturnValue(null).mockReturnValueOnce(
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

    test("check for no response from userProfile", async () => {
        renderWithProviders(<Home />)

        await act(async () => await userProfile())
        expect(screen.queryByTestId('Loader')).not.toBeInTheDocument()
        expect(screen.queryByText('testUser')).not.toBeInTheDocument()
    })
})
