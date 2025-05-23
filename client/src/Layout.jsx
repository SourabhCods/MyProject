import React from 'react';
import { useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Button, Drawer, Select, Slider } from 'antd';
import axios from 'axios';
import { PRODUCT_API } from './config';
import { optionsForCategory } from './options';

const Layout = () => {

    const [category , setCategory] = useState("")
    const [price , setPrice] = useState(0)
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    
    const onClose = () => {
        setOpen(false);
    };  

    const navigate = useNavigate()

    const handleOnCategoryChange = (value) => {
    setCategory(value)
  }

  const handleOnPriceChange = (value) => {
    setPrice(value)
  }


  const handleOnApplyBtnClick = async(category , price) => {
    try {
      const res =  await axios.post(`${PRODUCT_API}/filter/products` , {category , price})
      navigate('/', { state: res.data });
      
    } catch (e) {
      console.log(e)
    }
  }
    return (
        <>
        {/* Drawer Button */}
        <Button  
            onClick={showDrawer} 
            style={{
            position: "fixed",
            top: "20px",
            left: "20px",
            zIndex: 1000
            }}
        >
            <i className="fa-solid fa-bars"></i>
        </Button>

        <Drawer 
                title="Product Hub" 
                onClose={onClose} 
                open={open}
                placement="left"
                id='drawer'
                width="26.5rem"
                >
                <div className='menu_items' onClick={() => navigate('/')}>
                    Home
                    <i class="fa-solid fa-house"></i>
                </div>
                <div className='menu_items' onClick={() => navigate('/cart')}>
                    Cart Items
                    <i class="fa-solid fa-cart-shopping fa-bounce"></i>
                </div>
                <div className='menu_items' onClick={() => navigate('/orders')}>
                    Orders
                    <i class="fa-solid fa-bag-shopping fa-bounce"></i>
                </div>
                <div className='menu_items'>Profile
                    <i class="fa-solid fa-circle-user"></i>
                </div>
                <div className='menu_items'>Discounts & Offers
                    <i class="fa-solid fa-tags fa-shake"></i>
                </div>
        
        
                <div id='ct-bug-box'>
                    <p style={{
                    fontSize : "1.25rem",
                    }}>
                    Set Your Category & max.Budget
                    </p>
                    <Select
                    defaultValue="Select Category"
                    style = {{height : "3.5rem" , width : "20rem"}}
                    onChange={handleOnCategoryChange}
                    options={optionsForCategory}
                    />
                    <p style={{
                    fontSize : "1.25rem",
                    }}>
                    Maximum Budget
                    </p>  
                    <Slider 
                    min={0}
                    max={1000}
                    onChange={handleOnPriceChange}
                    />
                    <br/>
                    <Button 
                    onClick={() => handleOnApplyBtnClick(category , price)}
                    style={{
                        width : "70%",
                        height : "3rem"
                    }}
                    >
                    Apply
                    </Button>
                </div>
        
                
                </Drawer>

        {/* Render the routed page here */}
        <Outlet />
        </>
    );
};

export default Layout;