import { createSlice } from '@reduxjs/toolkit'
import { userLogin, userProfile, userSignup } from '../actions/authAction'

const initialState = {
    _id: null,
    title: null,
    name: null,
    value: null,
    cPwd: false,
    placeholder: null,
}


const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers: {
        create: (state, { payload }) => {
            // console.log(payload)
            state._id = payload._id
            state.title = payload.title
            state.name = payload.name
            state.value = payload.value
            state.cPwd = payload.cpwd
            state.placeholder = payload.placeholder
        },
        remove: (state) => {
            state._id = null
            state.title = null
            state.name = null
            state.value = null
            state.cPwd = false
            state.placeholder = null
        }
    }
})

const { create, remove } = inputSlice.actions
export { create, remove }

export default inputSlice

