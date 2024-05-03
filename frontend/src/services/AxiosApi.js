import API from './API'
import { toast } from 'react-toastify'

export const userSignup = async (values) => {
    try {
        const { data } = await API.post('/auth/signup', values)
        if (data.success) {
            toast.success(data.msg)
            setTimeout(() => {
                window.location.replace('/login')
            }, 1000)
        }

    } catch (error) {
        if (error.response && error.response.data.msg) {
            toast.error(error.response.data.msg)
        }
        else {
            toast.error(error.message)
        }
    }
}

export const userLogin = async (values, navigate) => {
    try {
        const { data } = await API.post('/auth/login', values)
        if (data.success) {
            toast.success(data.msg)
            window.localStorage.setItem('accessToken', data.accessToken)
            window.localStorage.setItem('refreshToken', data.refreshToken)
            setTimeout(() => navigate('/'), 1000)
        }

    } catch (error) {
        if (error.response && error.response.data.msg) {
            toast.error(error.response.data.msg)
        }
        else {
            toast.error(error.message)
        }
    }
}

export const userProfile = async () => {
    try {
        const { data } = await API.get('/auth/profile')
        if (data.success) {
            return data.user
        }
    }
    catch (error) {
        if (error.response && error.response.data.msg) {
            toast.error(error.response.data.msg)
            // console.log('not this')
        }
        else {
            // console.log('this error tap')
            // toast.error(error.message)
        }
        return 'error'
    }
}

export const createTeam = async (values) => {
    try {
        const { data } = await API.post('/team/create-team', values)
        if (data.success) {
            toast.success(data.msg)
            window.localStorage.setItem('teamToken', data.teamToken)
            return data.success
        }

    } catch (error) {
        if (error.response && error.response.data.msg) {
            toast.error(error.response.data.msg)
        }
        else {
            toast.error(error.message)
        }
        return false
    }
}

export const joinTeam = async (values) => {
    try {
        const { data } = await API.post('/team/join-team', values)
        if (data.success) {
            toast.success(data.msg)
            window.localStorage.setItem('teamToken', data.teamToken)
            return data.success
        }

    } catch (error) {
        if (error.response && error.response.data.msg) {
            console.log(error.response)
            toast.error(error.response.data.msg)
        }
        else {
            toast.error(error.message)
        }
        return false
    }
}

export const getTeam = async (teamToken) => {
    try {
        const { data } = await API.get(`/team/get-team?teamToken=${teamToken}`)
        if (data.success) {
            return { team: data.team, user: data.user }
        }

    } catch (error) {
        if (error.response && error.response.data.msg) {
            console.log(error.response)
            toast.error(error.response.data.msg)
        }
        else {
            toast.error(error.message)
        }
    }
}

export const getTaskContainers = async (postObj) => {
    try {
        const { data } = await API.post(`/team/get-taskContainer`, postObj)
        if (data.success) {
            return data.containers
        }

    } catch (error) {
        if (error.response && error.response.data.msg) {
            console.log(error.response)
            toast.error(error.response.data.msg)
        }
        else {
            toast.error(error.message)
        }
    }
}