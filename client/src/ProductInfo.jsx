import { Button } from "antd";
import { Link, useParams , useNavigate, Navigate } from "react-router-dom";
import { ORDER_API, PRODUCT_API, USER_API } from "./config";
import axios from "axios";
import { useState, useEffect } from "react";
import { auth } from "./firebaseInit";
import { Rate } from "antd"
import CustomCarousel from "./CustomCarousel";
import './productinfo.css'

const ProductInfo = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [orderCount , setOrderCount] = useState(0)
  const [cartArray, setCartArray] = useState([]);
  
  // Fetch product data
  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await axios.post(`${PRODUCT_API}/productInfo/${productId}`);
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
    naviagte("/details" , {state : {productId , price : product.price}})
  }

  setTimeout(async() => {
    const res = await axios.get(`${ORDER_API}/count/${productId}`)
    setOrderCount(res.data.count)
  } , 60000) 

      


  return (
    <>
      <Link to={"/cart"}>See Your Cart</Link>

      <CustomCarousel product={product} />
  
      <div className="product-info">
        <h3>{product.title}</h3>
        <p style={{fontSize : "1.5rem"}}><b>{product.price}$</b></p>
        <div>
          <Rate allowHalf value={product?.rating?.rate || 0} />
          <span> ({product?.rating?.count || 0} reviews)</span>
        </div>
        <p>{orderCount}</p>
        <p>{product.description}</p>
        <div className="btn-box">
          <Button onClick={isProductExistInCart} className="Btn">Add to Cart</Button>
          <Button onClick={onClickPlaceOrder} className="Btn">Place Order</Button>
        </div>
      </div>

    </>
  );
};

export default ProductInfo;