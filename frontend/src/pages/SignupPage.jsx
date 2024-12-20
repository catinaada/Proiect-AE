import React, { useState } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (email.length === 0 || password.length === 0 || name.length === 0) {
            setError('Email and password are mandatory fields');
            return;
        }


        try {
            await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/signup`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
             });

            navigate('/login')
        } catch (error) {
            alert('Signup failed!');
        }
    };

    return (
        <Container fluid className="login-container">
            <Row className="align-items-stretch vh-100">
                <Col md={6} className="d-none d-md-block image-column">
                    <div className="overlay-text">
                        <h2>Clean jewellery that make a statement.</h2>
                    </div>
                </Col>

                <Col md={6} className="form-column d-flex align-items-center justify-content-center">
                    <div className="form-box p-4 shadow rounded">
                        <h2 className="text-center mb-4"> Creeaza contul tau </h2>
                        <Form onSubmit={handleSignup}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Control type="text" placeholder="Nume" value={name}
                            onChange={(e) => setName(e.target.value)}
  />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="email">
                            <Form.Control
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Control
                                    type="password"
                                    placeholder="Parola"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="my-3">
                        Creare cont                    </Button>
                    <Form.Group controlId="password">
                        <Link to={"/login"}>Ai cont?</Link>
                    </Form.Group>
                                                
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default SignupPage;

