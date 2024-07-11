import React,{useState,useContext} from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form,FormGroup} from "reactstrap";
import { Link,useNavigate } from "react-router-dom";
import '../style/login.css';
import axios from 'axios'
import {useDispatch} from "react-redux";
import { setUserEmail } from "../redux/slices/userSlice";

const Login = () => {

    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:5000/api/v1/users/login', {
            email,
            password,
          });
    
          if (response.status === 200) {
            alert('Login successful');  
            dispatch(setUserEmail(email)) ; 
            navigate('/'); // Change '/dashboard' to your desired path
          }
        } catch (error) {
        //   console.error('Login failed:', error);
        //   toast.error('Invalid credentials');
        alert('invalid credentials')
        }
      };

    return (
      <Helmet title={'Login'}>
        <section>
            <Container>
                <Row>
                    <Col lg={6} className={'m-auto text-center'}>
                        <h3 className={'fw-bold mb-4'}>Login</h3>

                        <Form className={'auth__form'}>
                            <FormGroup className={'form__group'}>
                                <input type={'email'} placeholder={'Enter your email'}
                                value={email} onChange={e=> setEmail(e.target.value)}/>
                            </FormGroup>
                            <FormGroup className={'form__group'}>
                                <input type={'password'} placeholder={'Enter your password'}
                                       value={password} onChange={e=> setPassword(e.target.value)}/>
                            </FormGroup>

                            <button onClick={handleLogin} className='buy_btn auth__btn '>Login</button>
                            <p>Don't have an account? <Link to={'/signup'}>Create an account</Link></p>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
      </Helmet>
    );
};

export default  Login;