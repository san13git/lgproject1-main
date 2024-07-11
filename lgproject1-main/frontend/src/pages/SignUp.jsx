/*import React,{useState} from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form,FormGroup} from "reactstrap";
import { Link } from "react-router-dom";
import '../style/login.css';

const Signup = () => {
    const [username,setUsername]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [mobile,setMobile]= useState('')
    const [error,setError]= useState('')
    const [file,setFile]= useState(null)

    return (
        <Helmet title={'Signup'}>
            <section>
                <Container>
                    <Row>
                        <Col lg={6} className={'m-auto text-center'}>
                            <h3 className={'fw-bold mb-4'}>Signup</h3>

                            <Form className={'auth__form'}>
                                <FormGroup className={'form__group'}>
                                    <input type={'text'} placeholder={'Enter Username'}
                                           value={username} onChange={e=> setUsername(e.target.value)}/>
                                </FormGroup>
                                <FormGroup className={'form__group'}>
                                    <input type={'email'} placeholder={'Enter your email'}
                                           value={email} onChange={e=> setEmail(e.target.value)}/>
                                </FormGroup>
                                <FormGroup className={'form__group'}>
                                    <input type={'password'} placeholder={'Enter your password'}
                                           value={password} onChange={e=> setPassword(e.target.value)}/>
                                </FormGroup>
                                <FormGroup className={'form__group'}>
                                    <input type={'mobile'} onChange={e=> mobile(e.target.value)}/>
                                </FormGroup>

                                <button type={'submit'} className='buy_btn auth__btn '>Create an account</button>
                                <p>Already have an account? <Link to={'/login'}>Login</Link></p>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default  Signup;*/
import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import '../style/login.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle form submission logic
        if (!username || !email || !password || !mobile) {
            setError('All fields are required');
            return;
        }
        // Reset error
        
        if (mobile.length !== 10) {
            setError('Mobile number must be 10 digits.');
          } 
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/v1/users/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: username, email, password, mobile }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('User created successfully!');
                // Reset form
                setUsername('');
                setEmail('');
                setPassword('');
                setMobile('');
            } else {
                setError(data.message || 'Something went wrong');
            }
        } catch (error) {
            setError('Failed to sign up');
        }
      
        // Handle signup logic here
        console.log({ username, email, password, mobile });
    };

    return (
        <Helmet title={'Signup'}>
            <section>
                <Container>
                    <Row>
                        <Col lg={6} className={'m-auto text-center'}>
                            <h3 className={'fw-bold mb-4'}>Signup</h3>

                            <Form className={'auth__form'} onSubmit={handleSubmit}>
                                <FormGroup className={'form__group'}>
                                    <input 
                                        type={'text'} 
                                        placeholder={'Enter Username'}
                                        value={username} 
                                        onChange={e => setUsername(e.target.value)} 
                                    />
                                </FormGroup>
                                <FormGroup className={'form__group'}>
                                    <input 
                                        type={'email'} 
                                        placeholder={'Enter your email'}
                                        value={email} 
                                        onChange={e => setEmail(e.target.value)} 
                                    />
                                </FormGroup>
                                <FormGroup className={'form__group'}>
                                    <input 
                                        type={'password'} 
                                        placeholder={'Enter your password'}
                                        value={password} 
                                        onChange={e => setPassword(e.target.value)} 
                                    />
                                </FormGroup>
                                <FormGroup className={'form__group'}>
                                    <input 
                                        type={'tel'} 
                                        placeholder={'Enter your mobile number'}
                                        value={mobile} 
                                        onChange={e => setMobile(e.target.value)} 
                                    />
                                </FormGroup>

                                {error && <p className="text-danger">{error}</p>}

                                <button type={'submit'} className='buy_btn auth__btn'>
                                    Create an account
                                </button>
                                <p>Already have an account? <Link to={'/login'}>Login</Link></p>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Signup;
