import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
    
        if (email.length === 0 || password.length === 0) {
            setError('Email and password are mandatory fields');
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        const json = await response.json();

        if(!json.success) {
            setError(json.message)
        } else {
            localStorage.setItem('token', json.data);
            navigate('/')
        }
    }




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
                        <h2 className="text-center mb-4">Conecteaza-te la contul tau</h2>
                        <Form onSubmit={handleLogin}>
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

                            <Button variant="primary" type="submit" className="my-3">Intra in cont</Button>

                            <Form.Group controlId="password">
                              <Link to={"/signup"}>Nu ai cont?</Link>
                            </Form.Group> 

                            {error.length > 0 && <span>{error}</span>}

                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;
