import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import reduxStore from './redux/reduxStore'
import { BrowserRouter } from 'react-router-dom'
import { CounterProvider } from './contextApi/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter>
        <CounterProvider>
          <App />
        </CounterProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
