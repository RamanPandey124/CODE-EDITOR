import { Navigate } from "react-router-dom"
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'


const PublicRoute = ({ children }) => {
    const isAuthenticated = useIsAuthenticated()

    if (isAuthenticated()) {
        return <Navigate to={'/'} replace />
    }
    else {
        return children
    }
}

export default PublicRoute