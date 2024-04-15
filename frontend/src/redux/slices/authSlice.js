import { createSlice } from '@reduxjs/toolkit'
import { userLogin, userProfile, userSignup } from '../actions/authAction'

const initialState = {
    loading: false,
    error: null,
    msg: null,
    userDetails: {},
    userTeams: []
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

        // get-profile
        builder.addCase(userProfile.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userProfile.fulfilled, (state, { payload }) => {
            const { _id, username, email, teams } = payload[0]
            state.loading = false
            state.userDetails = { _id, username, email }
            state.userTeams = teams
        })
        builder.addCase(userProfile.rejected, (state, { payload }) => {
            state.loading = false
        })

    }
})

export default authSlice