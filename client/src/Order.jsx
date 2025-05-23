import axios from 'axios';
import React, { useEffect, useId, useState } from 'react';
import { ORDER_API, USER_API } from './config';
import { auth } from './firebaseInit';
import { 
    Card , 
    Divider , 
    Row , Col, 
    Button , 
    Modal, 
    Form, Input, InputNumber , DatePicker,
    message
} from 'antd'
import { Fragment } from 'react';
import './order.css'
import icons from './assests/links';
import { getDate } from './utilities';

const Order = () => {
    
    const [orders , setOrders] = useState([])
    const [detailBoxOpen , setDetailBoxOpen] = useState(false)
    const [fieldDisabled , setFieldDisabled] = useState(true)
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderBox , setShowOrderBox] = useState(false)
    
    const [form] = Form.useForm();




    // Fetch all orders of the current session user
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.post(`${USER_API}/orders` , {user_auth_id : auth.currentUser.uid})
                setTimeout(() => {
                    setShowOrderBox(true);
                },5000)
                setOrders(res.data)
            } catch (error) {
                console.log(error);
            }
        };

        fetchOrders(); 
    }, []);

    useEffect(() => {
        if (selectedOrder) {
        // Set form fields when selectedOrder changes
        form.setFieldsValue({
            deliveryAddress: selectedOrder.deliveryAddress,
            dateOfOrder: getDate(selectedOrder.date.dateOfOrder),
            dateOfDelivery: getDate(selectedOrder.date.dateOfDelivery),
            qty: selectedOrder.productData.qty
        });
        }
    }, [selectedOrder, form]);


    const handleOnSubmitForm = async(values) => {
        try{

            axios.patch(
                `${ORDER_API}/udt_detail` ,  
                { 
                    values,
                    orderId : selectedOrder._id,
                    product_details : selectedOrder.productData.pdtId
                }
            )
            message.success("Order Details Updated (O o O)")
        }
        catch(e){
            message.error("Something Went Wrong X X")
        }
    }

    const handleOnOrderDelete = async() => {
        const res = await axios.delete(`${ORDER_API}/${selectedOrder._id}` , {user_auth_id : auth.currentUser.uid})
        console.log(res.data);
    }
    

    
    return (
        <> 
        {orders.length === 0 && showOrderBox === true? 
            <Fragment>
                <a href='/'><img src='https://assets-v2.lottiefiles.com/a/0953d504-117d-11ee-aa49-1f149204cb5f/9uZcoEJaoF.gif'/></a>
                <p>YOU'VE NO ORDERS </p>
                <p>CLICK ON THE BOX TO BROWSE PRODUCTS</p>
            </Fragment> : 
            <div style={{ padding: '24px' }} appear>
                <p 
                    style={{
                        fontWeight: 200,
                        fontStyle: "normal",
                        fontSize : "3.5rem",
                        textAlign : "start",
                    }}
                >
                Your Order's
                </p>
                <Divider variant='dashed' style={{ borderColor: '#000000'}}/>
                <Row gutter={[16, 16]}>
                    {orders.map((order) => (
                        <Col key={order._id} xs={24} sm={12} md={8} lg={2} xl={2}>
                                <div id='order-box'>
                                    <div id='prim-box'>
                                        <img
                                            alt={order?.productData?.pdtId?.title}
                                            src={order?.productData?.pdtId?.image}
                                            style={{
                                            margin : "1rem 1rem 1rem 1rem",
                                            height: '9.5rem',
                                            objectFit: 'contain', // Ensures the image fits properly
                                            width: '20rem',
                                            }}
                                        /> 
                                        <div id='prim-details'>
                                            <p id='order-title'>{order?.productData?.pdtId?.title}</p>
                                            <div id='secd-details'>
                                                <div>
                                                    <p className='p1'>Price</p>
                                                    <p className='p2'>{order?.productData?.pdtId?.price}</p>
                                                </div>
                                                <div>
                                                    <p className='p1'>Qty.</p>
                                                    <p className='p2'>{order?.productData?.qty}</p>
                                                </div>
                                                <div>
                                                    <p className='p1'>Invoice</p>
                                                    <i class="fa-solid fa-download" style={{
                                                        fontSize : "1.8rem"
                                                    }}></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id='btn-box'>
                                        <button onClick={() => {
                                            setSelectedOrder(order);
                                            setDetailBoxOpen(true);
                                        }}>Item Details</button>
                                        <button>Track Order</button>
                                    </div>
                                </div>
                        </Col>
                    ))}
                </Row>
            </div> 
        }

        <Modal
            title={<h2 style={{ fontSize: '1.8rem', fontWeight: '600', fontFamily: 'Poppins' }}>Order Details</h2>}
            centered
            width={900}
            open={detailBoxOpen}
            onOk={() => setDetailBoxOpen(false)}
            onCancel={() => setDetailBoxOpen(false)}
            footer={null}
            >
            {selectedOrder && (
                <Form
                layout="vertical"
                name="orderForm"
                form={form}
                onFinish={handleOnSubmitForm}
                style={{ fontSize: '1.1rem' }}
                >
                <Form.Item
                    name="deliveryAddress"
                    label={<span style={{ fontSize: '1.25rem' }}>Your Order Address</span>}
                >
                    <Input disabled={fieldDisabled} className='form-fld'/>
                </Form.Item>

                <Form.Item
                    name="dateOfOrder"
                    label={<span style={{ fontSize: '1.25rem' }}>Date of Order</span>}
                >
                    <Input className='form-fld' disabled />
                </Form.Item>

                <Form.Item
                    className='form-fld'
                    name="dateOfDelivery"
                    label={<span style={{ fontSize: '1.25rem' }}>Date of Delivery</span>}
                >
                    <Input className='form-fld' disabled />
                </Form.Item>

                <Form.Item
                    className='form-fld'
                    name="qty"
                    label={<span style={{ fontSize: '1.25rem' }}>Quantity</span>}
                >
                    <InputNumber className='form-fld' disabled={fieldDisabled} style={{ width: '100%' }} />
                </Form.Item>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <Button onClick={() => setFieldDisabled(false)} className='modal-btn'>
                        <i class="fa-regular fa-pen-to-square"></i>
                        Edit Order Details
                    </Button>
                    <Button htmlType="submit" className='modal-btn'>
                        <i class="fa-regular fa-circle-check"></i>
                        Save Changes
                    </Button>
                    <Button onClick={handleOnOrderDelete} className='modal-btn' danger>
                        <i class="fa-solid fa-trash"></i>
                        Delete Order
                    </Button>
                </div>
                </Form>
            )}
        </Modal>
    </>
    )
};
    

export default Order;
