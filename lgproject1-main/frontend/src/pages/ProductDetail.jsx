import React , {useState , useRef , useEffect} from 'react';
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/Ui/CommonSection";
import '../style/product-detail.css';
import {motion} from "framer-motion";
import ProductsList from "../components/Ui/ProductList";
import { useDispatch } from "react-redux";
import {  cartActions } from "../redux/slices/cartSlice";
import {  toast } from "react-toastify";
import axios from 'axios'

const ProductDetail = () => {

    const [tab, setTab] = useState('desc');
    const reviewUser = useRef('')
    const reviewMsg =useRef('')
    const dispatch = useDispatch()
    const [rating,setRating]= useState(null)
    const { id} = useParams();
    const product = products.find(item => item.id === id)
    const {imgUrl, productName,price,avgRating,reviews,category  ,description,shortDesc} = product;
    const relatedProducts = products.filter(item => item.category===category)
    const submitHandler =(e)=>{
        e.preventDefault()

        const reviewUserName = reviewUser.current.value
        const reviewUserMsg = reviewMsg.current.value

        const reviewObj = {
            userName: reviewUserName,
            text:reviewUserMsg,
            rating,
        };

        console.log(reviewObj);
        toast.success('Review Submitted.')
    };

    const handleCardClick = async ({productId,userEmail}) => {
        // const userEmail = '123@gmail.com'; // Ideally, get this from logged-in user session or context
    
        try {
          const response = await axios.post('http://localhost:5000/api/v1/searches/log', {
            email: userEmail,
            productId: productId,
          });
          alert('Search logged successfully for ' );
        } catch (error) {
          console.error('Error logging search:', error);
          alert('Error logging search');
        }
      };


    const addToCart =()=> {
        dispatch(
            cartActions.addItem({
                id,
                image:imgUrl,
                productName,
                price,
            })
        );
        toast.success('Product added successfully.');
    };

    useEffect(()=>{
        window.scrollTo(0,0)
    },[product])

    return (
        
        <Helmet title={productName}>
            <CommonSection title={productName}/>
            <section className= "pt-0">
                <Container>
                    <Row>
                        <Col lg={6}>
                            <img src={imgUrl} alt={""}/>
                        </Col>
                        <Col lg={6}>

                        

                            <div className="product__detail" onClick={handleCardClick}>
                                <h2>{productName}</h2>
                                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                                    <div>
                                        <span><i className="ri-star-s-fill"></i></span>
                                        <span><i className="ri-star-s-fill"></i></span>
                                        <span><i className="ri-star-s-fill"></i></span>
                                        <span><i className="ri-star-s-fill"></i></span>
                                        <span><i className="ri-star-half-s-line"></i></span>
                                    </div>
                                    <p>(<span>{avgRating}</span> ratings)</p>
                                </div>
                                <div className='d-flex align-items-center gap-5'>
                                    <span className="product__price">Rs{price}</span>
                                    <span> Category : {category.toUpperCase()}</span>
                                </div>
                                <p className="mt-3">{shortDesc}</p>
                                <motion.button whileTap={{scale:1.2}}
                                               className="buy_btn"
                                               onClick={addToCart}>
                                    Add to Cart
                                </motion.button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <div className="tab__wrapper d-flex align-items-center gap-5">
                                <h6 className={`${tab === 'desc' ? 'active__tab' : ''}`}
                                onClick={()=> setTab('desc')}>
                                    Description
                                </h6>
                                <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`}
                                onClick={()=> setTab('rev')}>
                                    Reviews ({reviews.length})
                                </h6>
                            </div>

                            {
                                tab==='desc' ?
                                    (
                                        <div className="tab__content mt-5">
                                            <p>{description}</p>
                                        </div>
                                    ):(
                                        <div className="product__review mt-5">
                                            <div className="review__wrapper">
                                                <ul>
                                                    {
                                                        reviews.map((item,index)=>(
                                                            <li kew={index} className='mb-4'>
                                                                <h6>Vishwa Manamperi</h6>
                                                                <span>{item.rating}(rating)</span>
                                                                <p>{item.text}</p>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                                <div className="review__form">
                                                    <h4>Leave your experience</h4>
                                                    <form action="" onSubmit={submitHandler}>
                                                        <div className="form__group">
                                                            <input
                                                                type="text"
                                                                placeholder="Enter name"
                                                                ref={reviewUser}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form__group d-flex align-items-center gap-5 rating__group">
                                                            <motion.span whileTap={{scale:1.2}} onClick={ ()=>setRating(1) }>1
                                                                <i className='ri-star-s-fill'></i>
                                                            </motion.span>
                                                            <motion.span whileTap={{scale:1.2}} onClick={ ()=>setRating(2) }>2
                                                                <i className='ri-star-s-fill'></i>
                                                            </motion.span>
                                                            <motion.span whileTap={{scale:1.2}} onClick={ ()=>setRating(3) }>3
                                                                <i className='ri-star-s-fill'></i>
                                                            </motion.span>
                                                            <motion.span whileTap={{scale:1.2}} onClick={ ()=>setRating(4) }>4
                                                                <i className='ri-star-s-fill'></i>
                                                            </motion.span>
                                                            <motion.span whileTap={{scale:1.2}} onClick={ ()=>setRating(5) }>5
                                                                <i className='ri-star-s-fill'></i>
                                                            </motion.span>
                                                        </div>
                                                        <div className="form__group">
                                                            <textarea ref={reviewMsg}
                                                                      rows={4}
                                                                      type="text"
                                                                      placeholder="Review Message.."
                                                                      required
                                                            />
                                                        </div>
                                                        <motion.button whileTap={{scale:1.2}} type={"submit"} className="buy_btn">Submit</motion.button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    )

                            }
                        </Col>

                        <Col lg={12} className={'mt-5'}>
                            <h2 className='related__title'>You might also like</h2>
                        </Col>
                        <ProductsList data={relatedProducts}/>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
}

export default ProductDetail;


// import React from 'react'
// import axios from 'axios'
// import './Card.css'

// const Card = ({imagesrc,content,productId,userEmail}) => {

//     const handleCardClick = async () => {
//         // const userEmail = '123@gmail.com'; // Ideally, get this from logged-in user session or context
    
//         try {
//           const response = await axios.post('http://localhost:5000/api/v1/searches/log', {
//             email: userEmail,
//             productId: productId
//           });
//           alert('Search logged successfully for ' + content);
//         } catch (error) {
//           console.error('Error logging search:', error);
//           alert('Error logging search');
//         }
//       };




//   return (
//     <div className='card' onClick={handleCardClick}>
//     <img src={imagesrc} className='card-image'/>
//     <div className='react-box'>
        
//         <p className='card-content'>{content} </p>
//         <p>Product Id is {productId}</p>
//         <button className='card-button'>Add to Cart</button>
//     </div>
      
//     </div>
//   )
// }

// export default Card