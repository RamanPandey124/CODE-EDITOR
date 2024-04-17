
import React, { createContext, useReducer } from 'react';

export const CounterContext = createContext();
import { intialState, counterReducer } from './Reducer'


export const CounterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(counterReducer, intialState);

    return (
        <CounterContext.Provider value={{ state, dispatch }}>
            {children}
        </CounterContext.Provider>
    );
};

