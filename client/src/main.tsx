import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/layout/styles.css'
import { RouterProvider } from 'react-router-dom'
import { Router } from './app/Router/Router.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store/ConfigureStore.ts'
import { fetchProductsAsync } from './features/catalog/catalogSlice.ts'

store.dispatch(fetchProductsAsync());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   
      <Provider store={store}>
        <RouterProvider router={Router}/>
      </Provider>
    
  </React.StrictMode>,
)