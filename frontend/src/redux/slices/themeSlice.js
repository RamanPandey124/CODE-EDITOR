import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    theme: 'dark',
    shadow: 'dark-shadow',
    inputBorder: 'dark-input',
    headerBg: 'dark-header',
    modalBg: 'dark-modal',
    actionBg: "dark-actionBg"
}


const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        dark: (state) => {
            state.theme = 'dark'
            state.shadow = 'dark-shadow'
            state.inputBorder = 'dark-input'
            state.headerBg = "dark-header"
            state.modalBg = "dark-modal"
            state.actionBg = "dark-actionBg"
        },
        light: (state) => {
            state.theme = 'light'
            state.shadow = 'light-shadow'
            state.inputBorder = 'light-input'
            state.headerBg = "light-header"
            state.modalBg = "light-modal"
            state.actionBg = "light-actionBg"
        }
    }
})

const { dark, light } = themeSlice.actions
export { dark, light }

export default themeSlice

