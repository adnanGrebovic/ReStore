import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/layout/styles.css'
import { RouterProvider } from 'react-router-dom'
import { Router } from './app/Router/Router.tsx'
import { StoreProvider } from './app/context/StoreContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider router={Router}/>
    </StoreProvider>
  </React.StrictMode>,
)