import React from 'react';
import { useState, useEffect , Fragment } from 'react';
import axios from 'axios';
import {Card, Row, Col , Button , Divider , Drawer , Slider , Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_API } from './config';
import SelectBox from './antdesigncomponents/SelectBox';
import { optionsForCategory} from './options';
import './product.css';
import { Footer } from 'antd/es/layout/layout';

const { Meta } = Card;
const Product = () => {

  const navigate = useNavigate()
  const [products , setProducts] = useState([]);
  const [category , setCategory] = useState("")
  const [price , setPrice] = useState(0)
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // render's all data immediately
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get(`${PRODUCT_API}/allProducts`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error in fetching the products:", err);
      }
    };

    getAllProducts();
  }, []);

  const renderAllProducts = async () => {
      try {
        const res = await axios.get(`${PRODUCT_API}/allProducts`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error in fetching the products:", err);
      }
  }

  const handleOnCardClick = (productId) => {
    navigate(`/productInfo/${productId}`)
  }


  const handleOnCategoryChange = (value) => {
    setCategory(value)
  }

  const handleOnPriceChange = (value) => {
    setPrice(value)
  }

  const handleOnApplyBtnClick = async(category , price) => {
    try {
      const res =  await axios.post(`${PRODUCT_API}/filter/products` , {category , price})
      setProducts(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Button type="primary" onClick={showDrawer} style={{marginLeft : "85.5rem"}}>
        Open
      </Button>

      <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        <p onClick={renderAllProducts}>Browse All Products</p>
        
        <div className='menu_items'>See Your Cart</div>
        <div className='menu_items'>See Your Orders</div>
        <div className='menu_items'>About You</div>
        <div className='menu_items'>Discounts & Offers</div>

        <Select
          defaultValue="Select Category"
          style = {{height : "3.5rem" , width : "20rem"}}
          onChange={handleOnCategoryChange}
          options={optionsForCategory}
        />

        <p>Select Maximum Price</p>
        <Slider 
          min={0}
          max={1000}
          onChange={handleOnPriceChange}
        />
        <Button onClick={() => handleOnApplyBtnClick(category , price)}>Apply</Button>
        
      </Drawer>

      <div style={{ padding: '24px' }}>
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col key={product._id} xs={24} sm={12} md={8} lg={8} xl={8}>
              <Card
                style={{ width: '22rem' , height : '35rem'}}
                onClick={() => handleOnCardClick(product._id)}
                cover={
                  <img
                    alt={product.title}
                    src={product.image}
                    style={{
                      margin : "1rem 1rem 1rem 1rem",
                      height: '19.5rem',
                      objectFit: 'contain', // Ensures the image fits properly
                      width: '20rem',
                    }}
                    
                  />
                }
              >
              <Divider/>  
                  <Fragment>    
                    <i style={{fontSize : "0.97rem"}}>{product.title}</i>
                    <div
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2, // Limit to 2 lines
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis', // Add ellipsis for overflow
                        whiteSpace: 'normal', // Allow wrapping
                      }}
                    >
                    </div>
                  </Fragment> 
                  <div className='product-content'>
                    <p style={{fontSize : "1.5rem"}}><b>{product.price}$</b></p>
                    <div className='btn-group'>
                      <button className='btn'>Cart</button> 
                      <button className='btn'>Shop</button>
                    </div>
                  </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </> 
  );
};

export default Product;
