import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import PublicRoute from './services/PublicRoute'
import ProtectedRoute from './services/ProtectedRoute'
import Header from './components/singleUse/Header.jsx';
import Signup from './components/pages/Signup.jsx';
import Login from './components/pages/Login.jsx';
import Home from './components/pages/Home.jsx';



const Router = () => {

    return (
        <>
            <Header />
            <Routes>
                <Route path='/signup'
                    element={<PublicRoute><Signup /></PublicRoute>}
                />
                <Route path='/login'
                    element={<PublicRoute><Login /></PublicRoute>}
                />
                <Route element={<AuthOutlet fallbackPath='/login' />}>
                    <Route path='/' element={<Home />} />
                </Route>
            </Routes>
        </>
    )

}

export default Router