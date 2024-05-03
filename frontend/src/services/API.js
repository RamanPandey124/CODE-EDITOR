import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:1100' })

API.interceptors.request.use((req) => {
    console.log(req)
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken && !req.refresh) {
        console.log("accessToken=>", accessToken)
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
        console.log(error)
        const originalRequest = error.config
        // console.log(isRefreshed)

        if (error.response.status === 403 && !isRefreshed) {
            isRefreshed = true
            try {
                const refreshToken = localStorage.getItem('refreshToken')
                console.log("refreshToken=>", refreshToken)

                const { data } = await API.get('/auth/refresh-token', {
                    headers: { Authorization: `Bearer ${refreshToken}` },
                    refresh: true
                })

                // console.log(data)
                if (data?.success) {
                    localStorage.setItem('accessToken', data.accessToken)
                    localStorage.setItem('refreshToken', data.refreshToken)
                    originalRequest.headers.Authorization = data.accessToken
                    isRefreshed = false
                    console.log('all updated')
                    return API(originalRequest)
                }

            } catch (error) {
                console.log('refreshError', error)
                localStorage.clear()
                window.location.replace('/login')
            }
        }

    }
)
export default API