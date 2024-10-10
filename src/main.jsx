import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TodoAppDataProvider from './Context/TodoAppContext.jsx'
import { CreateTodoContext } from "./Context/TodoAppContext.jsx"
import { BrowserRouter } from 'react-router-dom'


export {CreateTodoContext}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <TodoAppDataProvider>
    <App />
    </TodoAppDataProvider>
    </BrowserRouter>
  </StrictMode>
)
