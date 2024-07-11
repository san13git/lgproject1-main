/*import React from "react";

import "../../style/Product-card.css";
import {motion} from "framer-motion";
import { Col } from "reactstrap";
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';

import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";

const ProductCard = ({item}) =>{

    const dispatch = useDispatch()

    const addToCart = ()=>{
        dispatch(
            cartActions.addItem({
                id: item.id,
                productName: item.productName,
                price: item.price,
                imgUrl : item.imgUrl,
            })
        );
        toast.success('Product Added Successfully.')
    };
    return (
        <Col lg='3' md='4' className="mb-2">
            <div className="product__item">
                <div className="product__img">
                    <motion.img whileHover={{scale: 0.9}} src={item.imgUrl}/>
                </div>
                <div className="p-2 product__info">
                    <h3 className="product__name">
                        <Link to={`/shop/${item.id}`}>{item.productName}</Link></h3>
                    <span>{item.category}</span>
                </div>
                <div
                    className="product_card-bottom d-flex align-items-center justify-content-between p-2">
                    <span className="price">Rs {item.price}</span>
                    <motion.span whileTap={{scale: 1.2}} onClick={addToCart}>
                    <i className="ri-add-line"></i>
                </motion.span>
                </div>
            </div>
        </Col>
    );
};

export default ProductCard;*/

import React  , {useState,useEffect,useContext} from "react";
import "../../style/Product-card.css";
import { motion } from "framer-motion";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch,useSelector } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import ProductDetail from "../../pages/ProductDetail";
import axios from 'axios'
import IdContext from "../../IdContext";
// import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ item}) => {
    const dispatch = useDispatch();
    const { id, productName, price, imgUrl, category } = item;
    const userEmail = useSelector((state) => state.user.email);
    // const[email,setEmail]=useState('');
    // const[userId,setUserId]=useContext(IdContext)
   
    // const[isLoggedIn,setIsLoggedIn]=useContext(AuthContext)

   
    // useEffect(() => {
    //     const fetchUserName = async () => {
    //       try {
    //         console.log(userId);
    //         const response = await axios.get(`http://localhost:5000/api/v1/users/login/${userId}`); // Adjust the URL as per your backend endpoint
    //         console.log(response.data);
    //         setEmail(response.data.email); // Assuming the response contains the user's email
    //       } catch (error) {
    //         console.error("Error fetching user name:", error);
    //         // Handle error, show error message to user or redirect to error page
    //       }
    //     };
    
    //     fetchUserName(); // Fetch user name when component mounts or userId changes
    //   }, [userId]);

    const handleCardClick = async () => {
        // const userEmail = '123@gmail.com'; // Ideally, get this from logged-in user session or context
    
        try {
          const response = await axios.post('http://localhost:5000/api/v1/searches/log', {
            email: userEmail,
            productId: id
          });
          alert('Search logged successfully for ' + productName );
        } catch (error) {
          console.error('Error logging search:', error);
          alert('Error logging search');
        }
      };

    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                id,
                productName,
                price,
                imgUrl,
            })
        );
        toast.success('Product Added Successfully.');
    };

    return (
        <Col lg="3" md="4" className="mb-2">
            <Link to={`/shop/${id}`} className="product__item-link" onClick={handleCardClick}>
                <div className="product__item">
                    <div className="product__img">
                        <motion.img 
                            whileHover={{ scale: 0.9 }} 
                            src={imgUrl} 
                            alt={productName} 
                        />
                    </div>
                    <div className="p-2 product__info">
                        <h3 className="product__name">
                            {productName}
                        </h3>
                        <span>{category}</span>
                    </div>
                    <div className="product_card-bottom d-flex align-items-center justify-content-between p-2">
                        <span className="price">Rs {price}</span>
                        <motion.span whileTap={{ scale: 1.2 }} onClick={(e) => {
                            e.preventDefault(); // Prevents Link from being triggered
                            addToCart();
                        }}>
                            <i className="ri-add-line"></i>
                        </motion.span>
                    </div>
                </div>
            </Link>
        </Col>
    );
};

export default ProductCard;
