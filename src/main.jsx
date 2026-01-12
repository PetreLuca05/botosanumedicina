import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from './components/Navbar.jsx'

import Home from './App.jsx'
import TabSlide1 from './tabs/TabSlide1/TabSlide1.jsx'
import NotFoundPage from './NotFoundPage.jsx'

const router = createBrowserRouter([
  { path: '/botosanumedicina', element: <Home /> },
  { path: '/botosanumedicina/tabslide1', element: <TabSlide1 /> },
  { path: '*', element: <NotFoundPage /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </StrictMode>,
)
