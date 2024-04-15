import { createSlice } from '@reduxjs/toolkit'
import { userLogin, userProfile, userSignup } from '../actions/authAction'

const initialState = {
    theme: 'dark',
    shadow: 'dark-shadow',
    inputBorder: 'dark-input'
}


const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        dark: (state) => {
            state.theme = 'dark'
            state.shadow = 'dark-shadow'
            state.inputBorder = 'dark-input'
        },
        light: (state) => {
            state.theme = 'light'
            state.shadow = 'light-shadow'
            state.inputBorder = 'light-input'
        }
    }
})

const { dark, light } = themeSlice.actions
export { dark, light }

export default themeSlice

