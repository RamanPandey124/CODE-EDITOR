import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../assets/backendAPI/API'
import { toast } from 'react-toastify';


export const createTeam = createAsyncThunk(
    'team/create',
    async (createData, { rejectWithValue }) => {
        try {
            console.log('createData =>', createData)
            const { data } = await API.post('/auth/create-team', createData)
            if (data.success) {
                toast.success(data.msg)
                console.log(data)
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
            console.log('joinData =>', joinData)
            const { data } = await API.post('/auth/join-team', joinData)
            if (data.success) {
                toast.success(data.msg)
                console.log(data)
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
