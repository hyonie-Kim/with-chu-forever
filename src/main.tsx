import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './scss/global.scss'
import { ModalContext } from './contexts/ModalContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalContext>
      <App />
    </ModalContext>
  </StrictMode>,
)
