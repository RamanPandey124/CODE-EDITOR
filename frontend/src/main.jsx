import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit'
import { Provider } from 'react-redux'
import reduxStore from './redux/reduxStore'

const store = createStore({
  authName: '_auth',
  authType: 'localstorage'
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <Provider store={reduxStore}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
)
