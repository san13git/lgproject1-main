import React ,{useState,useEffect} from "react";
import '../style/home.css';

import Helmet from "../components/Helmet/Helmet";
import Services from "../services/Services";
import ProductList from "../components/Ui/ProductList";
import Clock from "../components/Ui/Clock";
import product from "../assets/data/products"
import counterImg from "../assets/images/counter-timer-img.png"

import { Container, Row , Col } from "reactstrap";
import LGLogo from '../assets/images/LG-Logo.png'
import {Link} from "react-router-dom";
import { motion} from "framer-motion";

const Home = ()  => {

  const [trendingProducts,settrendingProducts] = useState([])
  const [bestSalesProducts,setbestSalesProducts] = useState([])
  const [mobileProducts,setmobileProducts] = useState([])
  const [wirelessProducts,setwirelessProducts] = useState([])
  const [popularProducts,setpopularProducts] = useState([])


  const year = new Date().getFullYear()

  useEffect(()=>{
    const filterdTrendigProduct = product.filter(
        (item)=> item.category === 'AC'
    );
    const filterBestSalesProduct = product.filter(
        (item)=> item.category === 'TV'
    );
    const filtermobileProducts = product.filter(
        (item)=> item.category === 'Microwave'
    );
    const filterwirelessProduct = product.filter(
        (item)=> item.category === 'Washing Machine'
    );
    const filterpopularProducts = product.filter(
        (item)=> item.category === 'Refrigerator'
    );

    settrendingProducts(filterdTrendigProduct);
    setbestSalesProducts(filterBestSalesProduct);
    setmobileProducts(filtermobileProducts);
    setwirelessProducts(filterwirelessProduct);
    setpopularProducts(filterpopularProducts);
  },[]);

  return <Helmet title={'Home'}>
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg='12'>
            <div className="hero__content">
              <p className="hero__subtitle">Wide range of trending products in {year}</p>
              <h2>Experience cutting-edge technology and sleek design with LG Electronics. </h2>
              <p>Discover innovative electronics and appliances at LG Electronics. From cutting-edge TVs to advanced home appliances, find the perfect solutions for your modern lifestyle.</p>
              <motion.button whileHover={{scale: 1.2 }} className="buy_btn">
                <Link to="/shop">SHOP NOW</Link>
              </motion.button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <Services/>
    <section className="trending__products">
      <Container>
        <Row>
          <Col lg='12' className="text-center">
            <h2 className="section__title">Trending Products</h2>
          </Col>
          <ProductList data={trendingProducts}/>
        </Row>
      </Container>
    </section>
    <section className="best__sales">
      <Container>
        <Row>
          <Col lg='12' className="text-center">
            <h2 className="section__title">Best Sales</h2>
          </Col>
          <ProductList data={bestSalesProducts}/>
        </Row>
      </Container>
    </section>
    <section className="timer__count">
      <Container>
        <Row>
          <Col lg='6' md='12' className='count__down-col'>
            <div className="clock__top-content">
              <h4 className="limited-offer text-white fs-6 mb-2">Limited time offer</h4>
              <h3 className="text-white fs-5 mb-3">3 Star (1.5) Split AC</h3>
            </div>
            <Clock/>
            <motion.button
                whileHover={{scale:1.2}}
                className="buy_btn store__btn">
              <Link to="/shop">Visit Stores</Link>
            </motion.button>
          </Col>
          <Col lg='6' md='12' className="text-end counter__img">
            <img src={counterImg} alt={""}/>
          </Col>
        </Row>
      </Container>
    </section>
    <section className="new__arrivals">
      <Container>
        <Row>
          <Col lg='12' className="text-center mb-5">
            <h2 className="section__title">New Arrivals</h2>
          </Col>
          <ProductList data={mobileProducts}/>
          <ProductList data={wirelessProducts}/>
        </Row>
      </Container>
    </section>
    <section className="popular__category">
      <Container>
        <Row>
          <Col lg='12' className="text-center mb-5">
            <h2 className="section__title">Popular in Category</h2>
          </Col>
          <ProductList data={popularProducts}/>
        </Row>
      </Container>
    </section>
  </Helmet>
};

export default Home;