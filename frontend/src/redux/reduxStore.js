import { configureStore } from '@reduxjs/toolkit'
import themeSlice from './slices/themeSlice'

const reduxStore = configureStore({
    reducer: {
        theme: themeSlice.reducer
    }
})

export default reduxStore