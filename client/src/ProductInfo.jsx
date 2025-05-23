import { Button } from "antd";
import { Link, useParams , useNavigate, Navigate } from "react-router-dom";
import { ORDER_API, PRODUCT_API, USER_API } from "./config";
import axios from "axios";
import { useState, useEffect } from "react";
import { auth } from "./firebaseInit";
import { Rate , Input } from "antd"
import CustomCarousel from "./CustomCarousel";
import './productinfo.css'

const ProductInfo = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [orderCount , setOrderCount] = useState(0)
  const [cartArray, setCartArray] = useState([]);
  const [qty , setQty] = useState(1)
  
  // Fetch product data
  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await axios.get(`${PRODUCT_API}/productInfo/${productId}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    getProductData();
  }, [productId]);


  // Add product to cart
  const addToCart = async () => {
    try {
      if (!auth.currentUser) {
        console.log("User not logged in");
        return;
      }
      const response = await axios.post(`${USER_API}/cart`, {
        userAuthId: auth.currentUser.uid,
        product_Id: productId,
      });

      const updatedCart = response.data.cartItems;
      setCartArray(updatedCart);
      

      console.log("Product added to cart:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Check if product already exists in cart
  const isProductExistInCart = () => {
    const productFound = cartArray.find((obj) => obj.pdtId === productId);
    if (productFound) {
      alert("Product is already in your cart!");
      return;
    } else {
      addToCart();
    }
  };

  const naviagte = useNavigate()

  const onClickPlaceOrder = async() => {
    naviagte("/details/single" , {state :  { single : {productId : productId , quantity : qty} } })
  }

  setTimeout(async() => {
    const res = await axios.get(`${ORDER_API}/count/${productId}`)
    setOrderCount(res.data.count)
  } , 60000) 

  const handleOnQtyBtnClick = async (operation) => {
    try {
      if(operation === "+"){
        setQty(prev => prev+1)
      }
      if(operation === "-" && qty > 1){
        setQty(prev => prev-1)
      }
      
    } catch (error) {
      console.error('Error updating cart:', error);
      message.error('Failed to update quantity');
    }
  };    


  return (
    <>
      <CustomCarousel product={product} />
  
      <div className="product-info">
        <h3>{product.title}</h3>
        <p style={{fontSize : "1.5rem"}}><b>{product.price}$</b></p>
        <div>
          <Rate allowHalf value={product?.rating?.rate || 0} />
          <span> ({product?.rating?.count || 0} reviews)</span>
        </div>
        <p>({orderCount} no.of users purchased in last minute)</p>
        <br/>
        <p>{product.description}</p>
        <div className="btn-box">
          <Button onClick={isProductExistInCart} className="Btn">Add to Cart</Button>
          <Button onClick={onClickPlaceOrder} className="Btn">Place Order</Button>
        </div>
        <div className="qty-Box">
          <p>How Much Quantity Did You Want To Purchase ?</p>
          <Button className="qty-btn" onClick={() => handleOnQtyBtnClick("+")}><span style={{position : "relative" , bottom : "0.2rem"}}>+</span></Button>
          <p style={{fontSize : "1.5rem"}}>{qty}</p>
          <Button className="qty-btn" onClick={() => handleOnQtyBtnClick("-")}><span style={{position : "relative" , bottom : "0.2rem"}}>-</span></Button>
        </div>
      </div>

    </>
  );
};

export default ProductInfo;