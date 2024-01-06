import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Navbar from './Navbar'
import BlueGradientSection from './Section1'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar></Navbar>
    <BlueGradientSection></BlueGradientSection>
    <App />
  </React.StrictMode>,
)
