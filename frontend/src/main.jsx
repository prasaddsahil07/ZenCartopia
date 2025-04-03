import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
      <CartProvider>
        <App />
      </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
)
