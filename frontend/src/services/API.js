import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({ baseURL: 'http://localhost:1100' })

API.interceptors.request.use((req) => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken && !req.refresh) {
        req.headers.Authorization = `Bearer ${accessToken}`
    }
    return req
})



let isRefreshed = false

API.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {

        const originalRequest = error.config

        if (!error.response) {
            toast.error(error.message)
            return error
        }

        if (error.response.status === 403 && !isRefreshed) {
            isRefreshed = true
            try {
                const refreshToken = localStorage.getItem('refreshToken')

                const { data } = await API.get('/auth/refresh-token', {
                    headers: { Authorization: `Bearer ${refreshToken}` },
                    refresh: true
                })

                if (!data) {
                    throw new Error("Something went wrong.")
                }

                if (!data?.success) {
                    throw new Error(data?.msg)
                }

                localStorage.setItem('accessToken', data.accessToken)
                localStorage.setItem('refreshToken', data.refreshToken)

                originalRequest.headers.Authorization = data.accessToken
                isRefreshed = false

                return API(originalRequest)

            } catch (error) {
                localStorage.clear()
                window.location.replace('/login')
            }
        }

        if (error.response && error.response.data.msg) {
            toast.error(error.response.data.msg)
        }

        return error
    }
)
export default API