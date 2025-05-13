import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './Protectedroute'
import Login from './Login'
import Signup from './Signup'
import Product from './Product'
import ProductInfo from './ProductInfo'
import Cart from './Cart'
import Payment from './Payment.jsx'
import Order from './Order'
import Map from './Map'
import Intermediatery from './Intermediatery'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        {[
          { path: '/', element: <Product /> },
          { path: '/productInfo/:productId', element: <ProductInfo /> },
          { path: '/cart', element: <Cart /> },
          { path: '/pay', element: <Payment /> },
          { path: '/orders', element: <Order /> },
          { path: '/map', element: <Map /> },
          { path: '/details/:type', element: <Intermediatery /> },
        ].map(({ path, element }) => (
          <Route 
            key={path} 
            path={path} 
            element={<ProtectedRoute>{element}</ProtectedRoute>} 
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
