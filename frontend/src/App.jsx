/*
import './App.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Router from './Router'
import Login from './components/pages/login/Login'
import Register from "./components/pages/register/Register"
import DragBox from './components/utils/dragBox/DragBox'


function App() {

  return (
    <div className="App">
      <ToastContainer />
      <Router />
    </div >
  )
}

export default App
*/

// import AuthProvider from 'react-auth-kit'
// import createStore from 'react-auth-kit/createStore';
// import { Provider } from 'react-redux'
// import reduxStore from './redux/reduxStore'

// const store = createStore({
//   authName: '_auth',
//   authType: 'localstorage'
// })

import './App.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Router from './Router'
import { useSelector } from 'react-redux';


function App() {
  const { theme } = useSelector((state) => state.theme)
  return (
    <div className={`App ${theme}`}>
      <ToastContainer />
      <Router />
    </div>
  )
}

export default App