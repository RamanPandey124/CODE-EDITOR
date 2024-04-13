import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/pages/login/Login'
import Register from './components/pages/register/Register'
import Home from './components/pages/home/Home'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import PublicRoute from './components/utils/routes/PublicRoute.jsx';
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={
                    <PublicRoute><Login /></PublicRoute>} />
                <Route path='/signup' element={
                    <PublicRoute><Register /></PublicRoute>} />
                <Route element={<AuthOutlet fallbackPath='/login' />}>
                    <Route path='/' element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router