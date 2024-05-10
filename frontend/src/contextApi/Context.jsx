import React, { createContext, useReducer } from 'react';
import { intialState, counterReducer } from './Reducer'

export const CounterContext = createContext();


export const CounterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(counterReducer, intialState);

    return (
        <CounterContext.Provider value={{ state, dispatch }}>
            {children}
        </CounterContext.Provider>
    );
};

