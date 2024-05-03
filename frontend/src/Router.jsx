import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import PublicRoute from './services/PublicRoute'
// import ProtectedRoute from './services/ProtectedRoute'
import Header from './components/singleUse/Header.jsx';
import Signup from './components/pages/Signup.jsx';
import Login from './components/pages/Login.jsx';
import Home from './components/pages/Home.jsx';
import LiveBlockEditor from './components/pages/LiveBlockEditor';
import TaskManager from './components/pages/TaskManager';
import ProtectedRoute from './services/ProtectedRoute';



const Router = () => {

    return (
        <>
            <Header />
            <Routes>
                <Route
                    path='/signup'
                    element={<PublicRoute><Signup /></PublicRoute>}
                />
                <Route path='/login'
                    element={<PublicRoute><Login /></PublicRoute>}
                />
                <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path='/editor' element={<ProtectedRoute><LiveBlockEditor /></ProtectedRoute>} />
                <Route path='/tasks' element={<ProtectedRoute><TaskManager /></ProtectedRoute>} />
            </Routes>
        </>
    )

}

export default Router