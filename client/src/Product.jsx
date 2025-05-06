import React from 'react';
import { useState, useEffect , Fragment } from 'react';
import axios from 'axios';
import {Card, Row, Col , Button , Divider , Drawer , Slider , Select , Tabs , Skeleton} from 'antd';
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
  const [showLoading , setShowLoading] = useState(false)

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

  setShowLoading(true); // Show skeletons immediately
  getAllProducts();

  const timer = setTimeout(() => {
    setShowLoading(false); // Show products after 2 seconds
  }, 5000);

  return () => clearTimeout(timer); // Clean up timeout if component unmounts
}, []);



  const renderAllProducts = async () => {
      try {
        const res = await axios.get(`${PRODUCT_API}/allProducts`);
        return res.data;
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

  const getProductsByCategory = async(category) => {
    try {
      const res =  await axios.get(`${PRODUCT_API}/${category}`)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  const handleOnApplyBtnClick = async(category , price) => {
    try {
      const res =  await axios.post(`${PRODUCT_API}/filter/products` , {category , price})
      setProducts(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  const onTabChange = async(key) => {
      const obj = items.find(obj => obj.key === key);
      try{
        const products = await getProductsByCategory(obj.category_type)
        setProducts(products)
      }
      catch(e){
        console.log(e)
      }
  }

  const items = [
    {
      key: '1',
      label: <img src = "https://static.vecteezy.com/system/resources/previews/036/498/120/non_2x/ai-generated-3d-cartoon-character-a-confident-male-with-crossed-arms-isolated-on-transparent-background-png.png" style={{height : "10.5rem" , width : "15.5rem"}}/>,
      category_type : "men's clothing"
    },
    {
      key: '2',
      label: <img src='https://static.vecteezy.com/system/resources/thumbnails/051/223/379/small/3d-cartoon-character-with-colorful-fashion-png.png' style={{height : "10.5rem" , width : "10.5rem"}}/>,
      category_type : "women's clothing"
    },
    {
      key: '3',
      label: <img src = "https://cdn3d.iconscout.com/3d/premium/thumb/electronics-3d-icon-download-in-png-blend-fbx-gltf-file-formats--machine-speaker-headphone-camera-screen-shopping-pack-e-commerce-icons-6713688.png" style={{height : "15.5rem" , width : "15.5rem"}}/>,
      category_type : "electronics"
    },
    {
      key: '4',
      label: <img src="https://cdn3d.iconscout.com/3d/premium/thumb/diamond-ring-3d-icon-download-in-png-blend-fbx-gltf-file-formats--wedding-engagement-woman-accessories-pack-beauty-icons-8160413.png?f=webp" style={{height : "10.5rem" , width : "11.5rem"}}/>,
      category_type : "jewelery"
    },
    {
      key: '5',
      label: <img src="https://thumbs.dreamstime.com/b/kitchen-laundry-equipment-cluster-silver-appliances-including-refrigerator-washing-machine-367336718.jpg" style={{height : "10.5rem" , width : "11.5rem"}}/>
    },
    {
      key : '6',
      label : <img src='https://media.istockphoto.com/id/1495829176/vector/vector-sofa-with-coffee-table-illustration.jpg?s=612x612&w=0&k=20&c=4NPjzak-Op5C0AU_6yvgMSxAb9SBhoIh-icfUfKDXwE=' style={{height : "10.5rem" , width : "11.5rem"}}/>
    }
  ];

  return (
    <>
      {/* <Button type="primary" onClick={showDrawer} style={{marginLeft : "85.5rem"}}>
        Open
      </Button> */}

      <Tabs items={items} onChange={onTabChange}/>

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
        <Row gutter={[16 , 16]}>
          {showLoading
            ? Array.from({ length: 20 }).map((_, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={8} xl={8}>
                  <Card style={{ width: '22rem', height: '25rem' }}>
                    <Skeleton/>
                    <Skeleton active paragraph={{ rows: 5 }} />
                  </Card>
                </Col>
              ))
            : products.map((product) => (
                <Col key={product._id} xs={24} sm={12} md={8} lg={8} xl={8}>
                  <Card
                    style={{ width: '22rem', height: '35rem' }}
                    onClick={() => handleOnCardClick(product._id)}
                    cover={
                      <img
                        alt={product.title}
                        src={product.image}
                        style={{
                          margin: '1rem',
                          height: '19.5rem',
                          objectFit: 'contain',
                          width: '20rem',
                        }}
                      />
                    }
                  >
                    <Divider />
                    <Fragment>
                      <i style={{ fontSize: '0.97rem' }}>{product.title}</i>
                    </Fragment>
                    <div className='product-content'>
                      <p style={{ fontSize: '1.5rem' }}>
                        <b>{product.price}$</b>
                      </p>
                      <Button className='buy_btn'>Buy Now</Button>
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
