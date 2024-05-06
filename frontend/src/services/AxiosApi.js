import API from './API'
import { toast } from 'react-toastify'

export const userSignup = async (values) => {
    try {
        const response = await API.post('/auth/signup', values)

        if (!response.data) {
            return null
        }
        let { data } = response

        if (!data.success) {
            return toast.error(data.msg)
        }

        toast.success(data.msg)
        setTimeout(() => {
            window.location.replace('/login')
        }, 1000)


    } catch (error) {
        toast.error(error.message)
    }
}

export const userLogin = async (values, navigate) => {
    try {
        const response = await API.post('/auth/login', values)

        if (!response.data) {
            return null
        }
        let { data } = response

        if (!data.success) {
            return toast.error(data.msg)
        }

        toast.success(data.msg)
        window.localStorage.setItem('accessToken', data.accessToken)
        window.localStorage.setItem('refreshToken', data.refreshToken)
        setTimeout(() => navigate('/'), 1000)

    } catch (error) {
        toast.error(error.message)
    }
}

export const userProfile = async () => {
    try {
        const response = await API.get('/auth/profile')

        if (!response.data) {
            return null
        }
        let { data } = response

        if (!data.success) {
            return toast.error(data.msg)
        }

        return data.user

    }
    catch (error) {
        toast.error(error.message)
    }
}

export const createTeam = async (values) => {
    try {
        const response = await API.post('/team/create-team', values)

        if (!response.data) {
            return null
        }
        let { data } = response

        if (!data.success) {
            return toast.error(data.msg)
        }

        toast.success(data.msg)
        window.localStorage.setItem('teamToken', data.teamToken)
        return data.success

    } catch (error) {
        toast.error(error.message)
    }
}

export const joinTeam = async (values) => {
    try {
        const response = await API.post('/team/join-team', values)

        if (!response.data) {
            return null
        }
        let { data } = response

        if (!data.success) {
            return toast.error(data.msg)
        }

        toast.success(data.msg)
        window.localStorage.setItem('teamToken', data.teamToken)
        return data.success

    } catch (error) {
        toast.error(error.message)
    }
}

export const getTeam = async (teamToken) => {
    try {
        const response = await API.get(`/team/get-team?teamToken=${teamToken}`)

        if (!response.data) {
            return null
        }
        let { data } = response

        if (!data.success) {
            return toast.error(data.msg)
        }
        return { team: data.team, user: data.user }

    } catch (error) {
        toast.error(error.message)
    }
}

export const getTaskContainers = async (postObj) => {
    try {
        const response = await API.post(`/team/get-taskContainer`, postObj)

        if (!response.data) {
            return null
        }
        let { data } = response

        if (!data.success) {
            return toast.error(data.msg)
        }

        return data.containers

    } catch (error) {
        toast.error(error.message)
    }
}