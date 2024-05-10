import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import reduxStore from '@/redux/reduxStore'
import { BrowserRouter } from 'react-router-dom'
import { CounterContext, CounterProvider } from '@/contextApi/Context'

const CustomContext = ({ children, state }) => {
    if (state) {
        return <CounterContext.Provider value={{ state }}>
            {children}
        </CounterContext.Provider>
    }
    return <CounterProvider>
        {children}
    </CounterProvider>
}


const handleProvider = (renderState) => {
    return ({ children }) => (
        <Provider store={reduxStore}>
            <BrowserRouter>
                <CustomContext state={renderState}>
                    {children}
                </CustomContext>
            </BrowserRouter>
        </Provider>
    )
}


export const renderWithProviders = (ui, renderState, options) => render(ui, { wrapper: handleProvider(renderState), ...options })

// re-export everything
export * from '@testing-library/react'
