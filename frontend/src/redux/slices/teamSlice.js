import { createSlice } from '@reduxjs/toolkit'
import { createTeam, joinTeam } from '../actions/teamAction'

const initialState = {
    loading: false,
    teamToken: null
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
            state.teamToken = payload.teamToken
        })
        builder.addCase(joinTeam.rejected, (state, { payload }) => {
            state.loading = false
        })


    }
})

export default teamSlice