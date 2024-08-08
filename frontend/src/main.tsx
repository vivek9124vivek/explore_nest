import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
ReactDOM.createRoot(document.getElementById('root')!).render(
    
    <Auth0Provider
    domain="dev-mulhqd36676jokh1.us.auth0.com"
    clientId="ITOqMimVczOBLHUoWDCUWOjGBQMTtHCR"
    authorizationParams={{ redirect_uri: window.location.origin + '/callback' }}
  >
    <App />
  </Auth0Provider>,
   
)
