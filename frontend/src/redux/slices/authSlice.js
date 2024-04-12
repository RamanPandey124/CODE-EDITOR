import { createSlice } from '@reduxjs/toolkit'
import { userLogin, userSignup } from '../actions/authAction'

const initialState = {
    loading: false,
    error: null,
    msg: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // signup
        builder.addCase(userSignup.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userSignup.fulfilled, (state, { payload }) => {
            state.loading = false
        })
        builder.addCase(userSignup.rejected, (state, { payload }) => {
            state.loading = false
        })

        // login
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            state.loading = false
        })
        builder.addCase(userLogin.rejected, (state, { payload }) => {
            state.loading = false
        })
    }
})

export default authSlice