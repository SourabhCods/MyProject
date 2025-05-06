import React, { Fragment, useState , useEffect } from 'react'
import { Button , Rate , Form, Input, Typography, Radio } from 'antd'
import Map from './Map'
import { ORDER_API, PRODUCT_API } from './config'
import { auth } from './firebaseInit'
import axios from 'axios'
import { useLocation , useNavigate } from 'react-router-dom'
import './intermediatery.css'
import { handlePayment } from './payment.js'

const Intermediatery = () => {
  const [showLoader , setShowLoader] = useState(false)
  const [product , setProduct] = useState({})
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [paymentMode , setPaymentMode] = useState("cash")


  const location = useLocation();

  const { productId , quantity } = location.state;


  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await axios.post(`${PRODUCT_API}/productInfo/${productId}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    getProductData()
  })

  const handleAddressSelect = (address) => {
    console.log('Selected Address from Map:', address);
    setSelectedAddress(address);
  }

  const onClickPlaceOrder = async() => {
    try{
      const response = await axios.post(`${ORDER_API}/single-order` , {
        product_mongo_id : productId,
        user_firebase_id : auth.currentUser.uid,
        delivery_address : selectedAddress,
        prdtQty : quantity,
        order_total_price : product.price*quantity
      })
      return response.data;
    }
    catch(error){
      console.log(error)
    }
  }


  const navigate = useNavigate()
  
  const handleOnPaymentBtnClick = async (select_pay_mode) => {
  try {
    if (select_pay_mode === "upi") {
      await handlePayment(product.price*quantity, async () => {
        await onClickPlaceOrder();
        navigate('/orders');     
      });
    } else {
      // set loader for 't' time 
      await onClickPlaceOrder();
      navigate('/orders');
    }
  } catch (err) {
    console.error("Order failed:", err);
  }
}



  const handleOnPaymentOptionChange = (e) => {
    setPaymentMode(e.target.value)
  }

  return (
      <>  
        {
          showLoader ? <p>Placing Your Order</p> :
        <Fragment>
          {/* map component rendering */}
          <Map onAddressSelect={handleAddressSelect}/>

          <div className="payment-methods-box">
              <h2>{product.price*quantity}</h2>
              <h2>Choose Payment Method</h2>
              
              <Radio.Group className="payment-options" onChange={handleOnPaymentOptionChange} defaultValue="cash">
                <div className="payment-option">
                  <img src="https://cdn3d.iconscout.com/3d/premium/thumb/cash-payment-3d-icon-download-in-png-blend-fbx-gltf-file-formats--shopping-ecommerce-buy-finance-pack-business-icons-9052805.png" alt="Cash Payment" />
                    <Radio value="cash"> Cash Payment</Radio>
                </div>
                  

                <div className="payment-option">
                  <img src="https://cdn3d.iconscout.com/3d/premium/thumb/online-payment-3d-icon-download-in-png-blend-fbx-gltf-file-formats--digital-card-mobile-credit-marketing-pack-branding-icons-6381049.png" alt="UPI Payment" />
                  <Radio value="upi"> Pay with UPI</Radio>
                </div>
              </Radio.Group>  
              <Button className="pay-button" onClick={() => handleOnPaymentBtnClick(paymentMode)}>Continue to Pay</Button>
          </div>
        </Fragment>
      }
    </>
  )
}

export default Intermediatery