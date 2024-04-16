
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const teamToken = window.localStorage.getItem('teamToken')

    if (!teamToken) {
        return <Navigate to={'/'} replace />
    }
    else {
        return children
    }
}

export default ProtectedRoute