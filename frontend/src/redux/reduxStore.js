import {configureStore} from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import themeSlice from './slices/themSlice'
import inputSlice from './slices/inputSlice'
import teamSlice from './slices/teamSlice'

const reduxStore = configureStore({
    reducer:{
        auth:authSlice.reducer,
        theme:themeSlice.reducer,
        input:inputSlice.reducer,
        team:teamSlice.reducer
    }
})

export default reduxStore