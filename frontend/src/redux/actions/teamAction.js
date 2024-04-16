import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../assets/backendAPI/API'
import { toast } from 'react-toastify';


export const createTeam = createAsyncThunk(
    'team/create',
    async (createData, { rejectWithValue }) => {
        try {
            console.log('createData =>', createData)
            const { data } = await API.post('/team/create-team', createData)
            if (data.success) {
                // toast.success(data.msg)
                await window.localStorage.setItem('teamToken', data.teamToken)
                // console.log(data.teamToken)
                window.location.replace("/editor")
            }
            return data
        }
        catch (error) {
            if (error.response && error.response.data.msg) {
                const msg = error.response.data.msg
                toast.error(msg)
                return rejectWithValue(msg)
            }
            else {
                return rejectWithValue(error.message)
            }
        }
    }
)


export const joinTeam = createAsyncThunk(
    'team/join',
    async (joinData, { rejectWithValue }) => {
        try {
            // console.log('joinData =>', joinData)
            const { data } = await API.post('/team/join-team', joinData)
            if (data.success) {
                // toast.success(data.msg)
                await window.localStorage.setItem('teamToken', data.teamToken)
                // console.log(data.teamToken)
                window.location.replace("/editor")
            }
            return data
        }
        catch (error) {
            if (error.response && error.response.data.msg) {
                const msg = error.response.data.msg
                toast.error(msg)
                return rejectWithValue(msg)
            }
            else {
                return rejectWithValue(error.message)
            }
        }
    }
)


export const getTeam = createAsyncThunk(
    'team/get',
    async (v, { rejectWithValue }) => {
        try {
            const teamToken = window.localStorage.getItem('teamToken')
            const { data } = await API.get('/team/get-team', {
                params: { teamToken }
            })
            if (data.success) {
                // toast.success(data.msg)
                return data.team
            }
        }
        catch (error) {
            if (error.response && error.response.data.msg) {
                const msg = error.response.data.msg
                toast.error(msg)
                window.location.replace('/')
                return rejectWithValue(msg)
            }
            else {
                return rejectWithValue(error.message)
            }
        }
    }
)
