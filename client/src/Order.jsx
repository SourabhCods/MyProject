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
    
    const [form] = Form.useForm();




    // Fetch all orders of the current session user
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.post(`${USER_API}/orders` , {user_auth_id : auth.currentUser.uid});
                console.log(res.data)
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
            orderTotal: selectedOrder.orderTotal,
            deliveryAddress: selectedOrder.deliveryAddress,
            dateOfOrder: getDate(selectedOrder.date.dateOfOrder),
            dateOfDelivery: getDate(selectedOrder.date.dateOfDelivery),
            qty: selectedOrder.productData.qty
        });
        }
    }, [selectedOrder, form]);
    // const onChange = (date, dateString) => {
    //     console.log(date, dateString);
    // };


    const handleOnSubmitForm = async(values) => {
        try{

            const res = axios.patch(
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

//ShantiNath Digambar Jain Mandir Sec 16 Rohini, A3/1, Near Canara Bank - Delhi Rockfield Public School, Pocket 3, Sector 16A, Rohini, Delhi, 110089, India
    
    return (
        <> 
        {orders.length != 0 ? 
            <div style={{ padding: '24px' }}>
                <Row gutter={[16, 16]}>
                    {orders.map((order) => (
                        <Col key={order._id} xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Card
                                style={{ width: '22rem' , height : '41.5rem'}}
                                // onClick={() => handleOnCardClick(product._id)}
                                cover={
                                  <img
                                    alt={order?.productData?.pdtId?.title}
                                    src={order?.productData?.pdtId?.image}
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
                                        <i style={{fontSize : "0.97rem"}}>{order?.productData?.pdtId?.title}</i>
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
                                    <div className='delivery_Data_Box'>
                                        <div className='delivery_Detail'>
                                            <img src={icons.orderPlaced}/>
                                            <p>
                                                { getDate(order.date?.dateOfOrder) }
                                            </p>
                                        </div>
                                        <div className='delivery_Detail'>
                                            <img src={icons.orderDelivered}/>
                                            <p>
                                                { getDate(order.date?.dateOfDelivery) }
                                            </p>
                                        </div>
                                        <Button onClick={() => {
                                            setSelectedOrder(order);
                                            setDetailBoxOpen(true);
                                        }}>
                                            Order Details
                                        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/navigation-3d-icon-download-in-png-blend-fbx-gltf-file-formats--location-direction-map-modern-life-pack-user-interface-icons-5999464.png?f=webp" className='btn-img'/>
                                        </Button>
                                    </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>  : 
            <>
                <a href='/'><img src='https://assets-v2.lottiefiles.com/a/0953d504-117d-11ee-aa49-1f149204cb5f/9uZcoEJaoF.gif'/></a>
                <p>YOU'VE NO ORDERS </p>
                <p>CLICK ON THE BOX TO BROWSE PRODUCTS</p>
            </>
}
            <Modal
                title="Order Details"
                centered
                width={900}
                open={detailBoxOpen}
                onOk={() => setDetailBoxOpen(false)}
                onCancel={() => setDetailBoxOpen(false)}
                styles={{body : {height : "22rem"}}}
                footer={null}
            >
                {selectedOrder && (
                    <Form 
                        variant='underlined' 
                        name="orderForm" 
                        form={form}
                        onFinish={handleOnSubmitForm}
                    >
                        <Form.Item name="orderTotal" label="Order Total">
                            <InputNumber 
                                disabled={true} 
                            />
                        </Form.Item>

                        <Form.Item name="deliveryAddress" label="Your Order Address">
                            <Input 
                                disabled={fieldDisabled}
                            />
                        </Form.Item>

                        <Form.Item name="dateOfOrder" label="Date of Order">
                            <Input disabled/>
                        </Form.Item>

                        <Form.Item name="dateOfDelivery" label="Date of Delivery">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item name = "qty" label="Quantity">
                            <InputNumber disabled={fieldDisabled} />
                        </Form.Item>

                        <Button onClick={() => setFieldDisabled(false)}>Edit Order Details</Button>
                        <Button htmlType="submit">Save Changes</Button>
                    </Form>
                )}
                </Modal>  
        </>
    )
};
    

export default Order;
