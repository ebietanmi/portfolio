import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Router, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Homepage from './client/pages/Homepage.jsx'

createRoot(document.getElementById('root')).render(<App/>)
