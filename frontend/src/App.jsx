import './App.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Router from './Router.jsx';

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