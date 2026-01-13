// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext/AuthContext.jsx';
import { DashboardContextProvider } from './context/Dashboard/DashboardContext.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <AuthContextProvider>
      <DashboardContextProvider>
        <App />
      </DashboardContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
  // </StrictMode>,
)
