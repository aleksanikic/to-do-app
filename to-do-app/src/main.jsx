import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import  {TaskProvider}  from './components/TaskProvider.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </StrictMode>,
)
