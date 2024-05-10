import { beforeEach, describe, expect, test, vi } from "vitest";
import { renderWithProviders, screen } from "@/testings/utils/test-utils";
import Header from "@/components/singleUse/Header";

describe("testing Header component", () => {

    test.skip("check header without accessToken", () => {
        renderWithProviders(<Header />)
        expect(screen.getByTestId('unAuthTheme')).toBeInTheDocument()
        expect(screen.queryByTestId('quoteDisplay')).not.toBeInTheDocument()
        expect(screen.queryByTestId('headerBar')).not.toBeInTheDocument()
    })
})

describe("testing header component with accessToken", () => {

    beforeEach(() => {
        localStorage.setItem("accessToken", "This-is-my-accessToken")
    })

    test("check identityBar with customContext", () => {
        renderWithProviders(<Header />, { user: { name: 'testUser' } })

        expect(screen.queryByTestId("quoteDisplay")).toBeInTheDocument()
        expect(screen.getByText(/testUser/)).toBeInTheDocument()
    })
})