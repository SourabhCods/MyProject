import React, { Fragment, useState , useEffect } from 'react'
import { Button, Radio } from 'antd'
import Map from './Map'
import { ORDER_API, PRODUCT_API } from './config'
import { auth } from './firebaseInit'
import axios from 'axios'
import { useLocation , useNavigate, useParams } from 'react-router-dom'
import './intermediatery.css'
import { handlePayment } from './payment.js'

const Intermediatery = () => {
  const [showLoader , setShowLoader] = useState(false)
  const [product , setProduct] = useState({})
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [paymentMode , setPaymentMode] = useState("cash")


  const location = useLocation();
  const { type } = useParams();

  // Initialize variables with safe defaults
  let productId, quantity, cartProducts, cartTotal;

  if (type === 'single' && location.state?.single) {
    ({ productId , quantity } = location.state.single);
  } else if (type === 'cart' && location.state?.cart) {
    ({ cartProducts, cartTotal } = location.state.cart);
  }
  


  useEffect(() => {
    if(type == "single") { 
      const getProductData = async () => {
      try {
        const res = await axios.get(`${PRODUCT_API}/productInfo/${productId}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
      getProductData()
    }
    }
  },[productId])

  let amount = type === "single" ? product.price*quantity : cartTotal

  const handleAddressSelect = (address) => {
    console.log('Selected Address from Map:', address);
    setSelectedAddress(address);
  }


  const handleOnSingleOrder = async() => {
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

  const handleOnCartProductsOrder = async() => {
    try {
      const res = await axios.post(
        `${ORDER_API}`, 
        { 
          currUserId: auth.currentUser.uid, 
          currCart: cartProducts,
          delivery_address : selectedAddress,
        }
      )
      return res.data;
    } catch (error) {
      console.error('Order failed:', error);
    }
  }

  const onClickPlaceOrder  = async() => {
    type === "cart"  ? await handleOnCartProductsOrder() :  await handleOnSingleOrder() 
  }


  const navigate = useNavigate()
  
  const handleOnPaymentBtnClick = async (select_pay_mode) => {
  try {
    if (select_pay_mode === "upi") {
      await handlePayment(amount, async () => {
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
              {/* <h2>{product.price*quantity || cartTotal}</h2> */}
              <h3>Select Payment Mode</h3>
              
              <Radio.Group className="payment-options" onChange={handleOnPaymentOptionChange} defaultValue="cash">
                <div className="payment-option" >
  
                  <Radio value="cash"></Radio>
                  <img src="https://cdn3d.iconscout.com/3d/premium/thumb/cash-payment-3d-icon-download-in-png-blend-fbx-gltf-file-formats--shopping-ecommerce-buy-finance-pack-business-icons-9052805.png" alt="Cash Payment" />
                  <div id="cod-box">
                    <p>Cash On Delivery , COD</p>
                    {
                      product.price*quantity < 100 && cartTotal < 100 ? 
                      <p><i>**Orders Above 100 are required**</i></p> : null
                    }
                  </div>
                </div>
                  

                <div className="payment-option">
                  <Radio value="upi"></Radio>
                  <img src="https://cdn3d.iconscout.com/3d/premium/thumb/online-payment-3d-icon-download-in-png-blend-fbx-gltf-file-formats--digital-card-mobile-credit-marketing-pack-branding-icons-6381049.png" alt="UPI Payment" />
                  <div id="cod-box">
                    <p>Pay Online  (<i>UPI, Wallets, Debit/Credit Cards..</i>)</p>
                  </div>
                </div>
              </Radio.Group>  
              <Button className="pay-button" onClick={() => handleOnPaymentBtnClick(paymentMode)}>Place Your Order Now
                <img 
                  src='https://png.pngtree.com/png-vector/20220821/ourmid/pngtree-speed-arrow-fast-quick-icon-logo-design-png-image_6119232.png'
                  style={{
                    width : "7.5rem",
                    height : "7.5rem"
                  }}
                />
              </Button>
          </div>
        </Fragment>
      }
    </>
  )
}

export default Intermediatery