import './App.css'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Product from './Product'
import ProductInfo from './ProductInfo'
import ProtectedRoute from './Protectedroute'
import Login from './Login'
import Signup from './Signup'
import Cart from './Cart'
import Payment from './Payment'
import Order from './Order'
import Map from './Map'
import Intermediatery from './Intermediatery'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            element={
              <ProtectedRoute>
                <Product/>
              </ProtectedRoute>
            }
          />  
          <Route path='/productInfo/:productId' element={<ProductInfo/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/pay" element={<Payment/>}/>
          <Route path="/orders" element={<Order/>}/>
          <Route path="/map" element={<Map/>}/>
          <Route path="/details" element={<Intermediatery/>}/>
        </Routes>
      </BrowserRouter>  
    </>
      
  )
}

export default App
