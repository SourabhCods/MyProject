import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Image, Typography, Space, message } from 'antd';
import { ORDER_API, USER_API } from './config';
import { auth } from './firebaseInit';
import { useNavigate } from 'react-router-dom';
import './product.css';

const { Title } = Typography;

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();
  const id = auth.currentUser?.uid;

  useEffect(() => {
    const getCartProducts = async () => {
      try {
        const response = await axios.get(`${USER_API}/cart/${id}`);
        setCartProducts(response.data.cartItems);
        setCartTotal(response.data.cartTotalPrice);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    getCartProducts();
  }, [cartProducts]);

  const handleOnQtyBtnClick = async (productId, operation) => {
    try {
      const response = await axios.post(`${USER_API}/cart/${id}`, { prdtId: productId, action: operation });
      setCartProducts(response.data.cartItems);
      setCartTotal(response.data.cartTotalPrice);
      message.success(`Quantity ${operation === 'increase' ? 'increased' : 'decreased'}`);
    } catch (error) {
      console.error('Error updating cart:', error);
      message.error('Failed to update quantity');
    }
  };

  const OnBuyBtnClick = async () => {
    try {
      const res = await axios.post(`${ORDER_API}`, { currUserId: id, currCart: cartProducts });
      console.log(res.data);
      message.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      console.error('Order failed:', error);
      message.error('Failed to place order');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => (
        <Image
          src={record.pdtId.image}
          alt={record.pdtId.title}
          width={100}
          height={100}
          style={{ borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
        />
      ),
    },
    {
      title: 'Product',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => (
        <Space direction="vertical">
          <Title level={5}>{record.pdtId.title}</Title>
          <p>{record.pdtId.description}</p>
        </Space>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => `₹${record.pdtId.price * record.qty}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
      render: (_, record) => (
        <Space>
          <Button onClick={(e) => {
                        e.stopPropagation();
                        handleOnQtyBtnClick(record.pdtId._id , "decrease");
                      }}>-</Button>
          <span>{record.qty}</span>
          <Button onClick={(e) => {
                        e.stopPropagation();
                        handleOnQtyBtnClick(record.pdtId._id , "increase");
                      }}>+</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Shopping Cart</Title>
      <Table
        dataSource={cartProducts}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={false}
        bordered
        style={{
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      />
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <Title level={4}>Total: ₹{cartTotal}</Title>
        {cartProducts ? (
          <Button type="primary" size="large" onClick={OnBuyBtnClick}>
            Place Your Order
          </Button>
        ) : (
          <div>

            <i>Cart is Empty. Go to Home Page</i>
          </div>


        )}
      </div>
    </div>
  );
};

export default Cart;
