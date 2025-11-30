import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <-- NEW: Required for useNavigate()
import { I18nextProvider } from 'react-i18next'; // <-- NEW: Required for useTranslation()
import i18n from './i18n'; // The i18n instance
import './index.css'
import App from './App.jsx'
import AuthProvider from './contexts/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 1. BrowserRouter must wrap any component that uses routing hooks like useNavigate. 
      2. I18nextProvider must wrap any component that uses useTranslation.
      3. AuthProvider is usually placed inside the router for full access to route information.
    */}
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </I18nextProvider>
    </BrowserRouter>
  </StrictMode>,
)