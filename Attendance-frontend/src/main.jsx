import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Cryptography from './Components/Cryptography.jsx'
import DAA from './Components/Design-and-Analysis-of-Algorithms.jsx'
import SAD from './Components/System-Analysis-and-Design.jsx'
import WebTech from './Components/Web-Technology.jsx'
import SM from './Components/Simulation-and-Modeling.jsx'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/cryptography",
    element: <Cryptography/>
  },
  {
    path: "/DAA",
    element: <DAA/>
  },
  {
    path: "/SAD",
    element: <SAD/>
  },
  {
    path: "/WebTechnology",
    element: <WebTech/>
  },
  {
    path: "/SM",
    element: <SM/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
