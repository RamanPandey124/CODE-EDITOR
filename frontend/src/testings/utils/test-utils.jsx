import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import reduxStore from '@/redux/reduxStore'
import { BrowserRouter } from 'react-router-dom'
import { CounterProvider } from '@/contextApi/Context'



const AllTheProviders = ({ children }) => {
    return (
        <Provider store={reduxStore}>
            <BrowserRouter>
                <CounterProvider>
                    {children}
                </CounterProvider>
            </BrowserRouter>
        </Provider>
    )
}

export const renderWithProviders = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'
