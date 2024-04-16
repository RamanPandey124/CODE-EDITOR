import { createSlice } from '@reduxjs/toolkit'
import { createTeam, getTeam, joinTeam } from '../actions/teamAction'

const initialState = {
    loading: false,
    teamData: null,
    error: null
}

const teamSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // create team
        builder.addCase(createTeam.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createTeam.fulfilled, (state, { payload }) => {
            state.loading = false
            state.teamToken = payload.teamToken
        })
        builder.addCase(createTeam.rejected, (state, { payload }) => {
            state.loading = false
        })

        // join team
        builder.addCase(joinTeam.pending, (state) => {
            state.loading = true
        })
        builder.addCase(joinTeam.fulfilled, (state, { payload }) => {
            state.loading = false
        })
        builder.addCase(joinTeam.rejected, (state, { payload }) => {
            state.loading = false
        })

        // get team
        builder.addCase(getTeam.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getTeam.fulfilled, (state, { payload }) => {
            state.loading = false
            state.teamData = payload
        })
        builder.addCase(getTeam.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })


    }
})

export default teamSlice