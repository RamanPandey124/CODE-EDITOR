import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../assets/backendAPI/API'
import { toast } from 'react-toastify';


export const userSignup = createAsyncThunk(
    'auth/signup',
    async (signupData, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/signup', signupData)
            if (data.success) {
                toast.success(data.msg)
                setTimeout(() => {
                    window.location.replace('/login')
                }, 1000)
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

export const userLogin = createAsyncThunk(
    'auth/login',
    async (loginData, { rejectWithValue }) => {
        // console.log('loginData =>', loginData)
        try {
            const { data } = await API.post('/auth/login', loginData)
            console.log('data =>', data)
            if (data.success) {
                toast.success(data.msg)
                setTimeout(() => {
                    window.location.replace('/')
                }, 1000);
            }
        }
        catch (error) {
            // console.log('error =>', error)
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