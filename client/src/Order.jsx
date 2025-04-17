import axios from 'axios';
import React, { useEffect, useId, useState } from 'react';
import { ORDER_API } from './config';
import { auth } from './firebaseInit';

const Order = () => {

    const [orders , setOrders] = useState([])
    // Fetch all orders of the current session user
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`${ORDER_API}/${auth.currentUser.uid}`);
                console.log(res.data)
                // setOrders(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchOrders(); 
    }, []);
    

    
        return (
            <div key={useId()}>
                {
                    // orders.map((order) => (
                        
                    // ))
                }
            </div>
        )
    
};

export default Order;