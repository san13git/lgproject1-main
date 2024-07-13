
// import React, { useEffect } from "react";
// import { Container, Row, Col } from "reactstrap";
// import Helmet from "../components/Helmet/Helmet";
// import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import axios from 'axios';
// import '../style/OrderConfirmation.css';

// const OrderConfirmation = () => {
//     const location = useLocation();
//     const { cartItems, totalAmount, orderID, email } = location.state;

//     useEffect(() => {
//         // Function to send order data to the backend
//         const saveOrder = async () => {
//             try {
//                 const response = await axios.post('http://localhost:5000/api/v1/orders/confirm', {
//                     items: cartItems.map(item => ({
//                         name: item.productName,
//                         quantity: item.quantity,
//                         price: item.totalPrice / item.quantity // Assuming totalPrice is the sum price of all quantities
//                     })),
//                     totalPrice: totalAmount,
//                     email: email
//                 });
//                 console.log('Order saved:', response.data);
//             } catch (error) {
//                 console.error('Error saving order:', error);
//             }
//         };

//         saveOrder();
//     }, [cartItems, totalAmount, email]);

//     return (
//         <Helmet title={'Order Confirmation'}>
//             <section className="order-confirmation">
//                 <Container>
//                     <Row>
//                         <Col className="text-center">
//                             <h2>Thank you for ordering!</h2>
//                             <h4>Your Order ID: {orderID}</h4>
//                             <div className="order-summary">
//                                 <h5>Items Ordered:</h5>
//                                 <ul>
//                                     {cartItems.map((item, index) => (
//                                         <li key={index}>
//                                             {item.productName} (x{item.quantity}) - ${item.totalPrice.toFixed(2)}
//                                         </li>
//                                     ))}
//                                 </ul>
//                                 <h5>Total Price: ${totalAmount.toFixed(2)}</h5>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>
//             </section>
//         </Helmet>
//     );
// }

// export default OrderConfirmation;

import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useLocation } from "react-router-dom";

import axios from 'axios';
import '../style/OrderConfirmation.css';

const OrderConfirmation = () => {
    const location = useLocation();
    const { cartItems, totalAmount, orderID,email} = location.state;
    

    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const saveOrder = async () => {
            if (!isSaved) {
                try {
                    const response = await axios.post('http://localhost:5000/api/v1/orders/confirm', {
                        items: cartItems.map(item => ({
                            name: item.productName,
                            quantity: item.quantity,
                            price: item.totalPrice / item.quantity // Assuming totalPrice is the sum price of all quantities
                        })),
                        totalPrice: totalAmount,
                        email: email
                    });
                    console.log('Order saved:', response.data);
                    setIsSaved(true); // Mark as saved to prevent future saves
                } catch (error) {
                    console.error('Error saving order:', error);
                }
            }
        };

        saveOrder();
    }, [cartItems, totalAmount, email, isSaved]);

    return (
        <Helmet title={'Order Confirmation'}>
            <section className="order-confirmation">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <h2>Thank you for ordering!</h2>
                            <h4>Your Order ID: {orderID}</h4>
                            <div className="order-summary">
                                <h5>Items Ordered:</h5>
                                <ul>
                                    {cartItems.map((item, index) => (
                                        <li key={index}>
                                            {item.productName} (x{item.quantity}) - ${item.totalPrice.toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                                <h5>Total Price: ${totalAmount.toFixed(2)}</h5>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
}

export default OrderConfirmation;

