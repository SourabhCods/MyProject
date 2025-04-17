import React, { Fragment, useState } from 'react'
import { Button , Rate , Form, Input, Typography, Radio } from 'antd'
import Map from './Map'
import { ORDER_API, PRODUCT_API } from './config'
import { auth } from './firebaseInit'
import axios from 'axios'
import { useLocation , useNavigate } from 'react-router-dom'
import './intermediatery.css'

const Intermediatery = () => {
  const [showLoader , setShowLoader] = useState(false)
  const [product , setProduct] = useState({})
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [paymentMode , setPaymentMode] = useState("")


  const location = useLocation();

  const { productId } = location.state;

  const handleAddressSelect = (address) => {
        console.log('Selected Address from Map:', address);
        setSelectedAddress(address);
  }

  const onClickPlaceOrder = async() => {
    try{
      const response = await axios.post(`${ORDER_API}/single-order` , {
        product_mongo_id : productId,
        user_firebase_id : auth.currentUser.uid,
        delivery_address : selectedAddress
      })
      console.log(response.data)
    }
    catch(error){
      console.log(error)
    }
  }

  const getProductData = async () => {
    try {
      const res = await axios.post(`${PRODUCT_API}/productInfo/${productId}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  getProductData()



  const handleOnCashClick = () => {
    setShowLoader(true)
    setTimeout(() => {
      onClickPlaceOrder() // <= make changes here (naviagte to orders page)
      setShowLoader(false)
    } , 20000)
  }

  const navigate = useNavigate()
  const handleOnCashlessClick = () => {
    navigate('/pay' ,  { state : product.price })
  } 

  const handleOnPaymentOptionChange = (e) => {
    setPaymentMode(e.target.value)
  }

  const handleOnPayBtnClick = () => {
    if(paymentMode === "cash") handleOnCashClick()
    if(paymentMode === "upi") handleOnCashlessClick()
  }

  return (
      <>  
        {
          showLoader ? <p>Placing Your Order</p> :
        <Fragment>
          <p>Pick your Delivery Location</p>
          {/* map component rendering */}
          <Map onAddressSelect={handleAddressSelect}/>

          <div className="payment-methods-box">
              <h2>Choose Payment Method</h2>
              
              <Radio.Group className="payment-options" onChange={handleOnPaymentOptionChange} defaultValue="cash">
                <div className="payment-option">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3-KK0s0XsS2BOSWWzF_UM_WMX97sH_sgcAA&s" alt="Cash Payment" />
                    <Radio value="cash"> Cash Payment</Radio>
                </div>
                  

                <div className="payment-option">
                  <img src="https://img.icons8.com/fluent/512/bhim.png" alt="UPI Payment" />
                    <Radio value="upi"> Pay with UPI</Radio>
                </div>
                  

                <div className="payment-option">
                  <img src="https://icons.iconarchive.com/icons/aha-soft/business/256/credit-cards-icon.png" alt="Card Payment" />
                    <Radio value="card"> Debit/Credit Card</Radio>
                </div>
                  

                <div className="payment-option">
                  <img src="https://img.freepik.com/premium-vector/online-banking-icon-flat-illustration-online-banking-vector-icon-isolated-white-background_98396-41499.jpg" alt="Net Banking" />
                    <Radio value="net banking"> Net Banking</Radio>
                </div>
                  

                <div className="payment-option">
                  <img src="https://img.freepik.com/premium-vector/wallet-with-dollar-banknote-vector-isolated-icon-emoji-illustration-wallet-vector-emoticon_603823-1065.jpg" alt="Wallet Payment" />
                    <Radio value='wallets'>Wallets</Radio>
                </div>
              </Radio.Group>  
              <Button className="pay-button" onClick={handleOnPayBtnClick}>Continue to Pay</Button>
          </div>
        </Fragment>
      }
    </>
  )
}

export default Intermediatery