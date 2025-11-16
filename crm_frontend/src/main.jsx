import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './Components/Context/AppContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
    
  </StrictMode>,
)
