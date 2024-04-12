import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/pages/login/Login'
import Register from './components/pages/register/Register'
import Home from './components/pages/home/Home'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router