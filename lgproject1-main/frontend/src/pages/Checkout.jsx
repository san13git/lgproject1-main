
import React from "react";
//import { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/Ui/CommonSection";
import '../style/checkout.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalQty = useSelector(state => state.cart.totalQuantity);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Generate a random order ID
        const orderID = Math.floor(Math.random() * 1000000000);

        // Redirect to order confirmation page
        navigate('/order-confirmation', {
            state: {
                cartItems: cartItems,
                totalAmount: totalAmount,
                orderID: orderID
            }
        });
    };

    return (
        <Helmet title={'Checkout'}>
            <CommonSection title={'Checkout'} />
            <section>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <h6 className={'mb-4 fw-bold'}>Billing Information</h6>
                            <Form onSubmit={handleSubmit} className={'billing__form'}>
                                <FormGroup className="form__group">
                                    <input type="text" placeholder={'Enter your name'} required />
                                </FormGroup>
                                <FormGroup className="form__group">
                                    <input type="email" placeholder={'Enter your email'} required />
                                </FormGroup>
                                <FormGroup className="form__group">
                                    <input type="number" placeholder={'Phone number'} required />
                                </FormGroup>
                                <FormGroup className="form__group">
                                    <input type="text" placeholder={'Street address'} required />
                                </FormGroup>
                                <FormGroup className="form__group">
                                    <input type="text" placeholder={'City'} required />
                                </FormGroup>
                                <FormGroup className="form__group">
                                    <input type="text" placeholder={'Postal code'} required />
                                </FormGroup>
                                <button type="submit" className='buy_btn auth__btn w-100'>Place an order</button>
                            </Form>
                        </Col>
                        <Col lg={4}>
                            <div className="checkout__cart">
                                <h6>Total Qty: <span>{totalQty} items</span></h6>
                                <h6>Subtotal: <span>${totalAmount.toFixed(2)}</span></h6>
                                <h6>
                                    <span>
                                        Shipping: <br />
                                        (free shipping)
                                    </span>
                                    <span>$0</span>
                                </h6>
                                <h4>Total cost: <span>${totalAmount.toFixed(2)}</span></h4>

                                <h6 className={'mt-4 fw-bold'}>Items in Cart:</h6>
                                <ul>
                                    {cartItems.map((item, index) => (
                                        <li key={index}>{item.productName} (x{item.quantity})</li>
                                    ))}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
}

export default Checkout;