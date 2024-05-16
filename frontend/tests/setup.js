import { afterEach, beforeAll } from 'vitest'
import { cleanup, configure } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { server } from '@/testings/mocks/server'

beforeAll(() => {
    configure({ testIdAttribute: "id" })
    server.listen()
})

afterEach(() => {
    cleanup();
    server.resetHandlers()
})

afterAll(() => server.close());