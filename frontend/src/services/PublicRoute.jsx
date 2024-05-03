import { Navigate } from "react-router-dom"


const PublicRoute = ({ children }) => {
    const accessToken = window.localStorage.getItem('accessToken')

    if (accessToken) {
        return <Navigate to={'/'} replace />
    }
    else {
        return children
    }
}

export default PublicRoute