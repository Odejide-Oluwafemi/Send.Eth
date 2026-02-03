import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BlockchainContextProvider } from './context/BlockchainContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BlockchainContextProvider>
      <App />
    </BlockchainContextProvider>
  </StrictMode>,
)
