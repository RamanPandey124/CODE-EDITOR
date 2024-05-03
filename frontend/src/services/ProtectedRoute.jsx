
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (!accessToken) {
        return <Navigate to={'/login'} />
    }
    else {
        return children
    }
}

export default ProtectedRoute