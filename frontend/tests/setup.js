import { afterEach, beforeAll } from 'vitest'
import { cleanup, configure } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// runs a clean after each test case (e.g. clearing jsdom)
beforeAll(() => {
    configure({ testIdAttribute: "id" })
})
afterEach(() => {
    cleanup();
})