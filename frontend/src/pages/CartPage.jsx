import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Image, Form } from 'react-bootstrap';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState('');  // 
    const [city, setCity] = useState('');  // Valoare implicită
    const [phone, setPhone] = useState('');  // Valoare implicită
    const [user, setUser] = useState({ logged: false, admin: false, id: undefined });

    const navigate = useNavigate();

    const verifyUser = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded) {
                setUser({ admin: decoded.role === 'admin', logged: true, id: decoded.id });
            } else {
                localStorage.removeItem('token');
                setUser({ admin: false, logged: false });
                navigate("/login");
            }
        } else {
            setUser({ admin: false, logged: false });
            navigate("/login");
        }
    };

    useEffect(() => {
        verifyUser();
    }, [localStorage.getItem('token')]);

    const fetchCart = async () => {
        try {
            const response = await axiosInstance.get('/api/orders/user/' + user.id);
           
            const pendingOrder = response.data.find(order => order.status === 'pending');
            if (pendingOrder) {
                setCartItems(pendingOrder.OrderItems);
                setTotalPrice(pendingOrder.totalPrice);
            } else {
                setCartItems([]);
                setTotalPrice(0);
            }
        } catch (error) {
            setCartItems([]);
            setTotalPrice(0);
            console.error('Failed to load cart!');
        }
    };

    useEffect(() => {
        user.id && fetchCart();
    }, [user]);

    const handleRemoveFromCart = async (itemId) => {
        try {
            await axiosInstance.delete(`api/orders/user/${user.id}/cart/${itemId}`);
            fetchCart();
        } catch (error) {
            alert('Failed to remove Product!');
        }
    };


    const changeQuantity = async (quantity, productId) => {
        try {
             await axiosInstance.post(`/api/orders/user/${user.id}/cart`, {productId, quantity});
            fetchCart();
        } catch (error) {
            alert('Eroare!');
        }
    };

    const handleCheckout = async () => {
        if (!address || !city || !phone) {
            alert('Te rugăm să completezi toate câmpurile!');
            return;
        }

        try {
            const orderData = {
                address,
                city,
                phone,
            };
            const response = await axiosInstance.put(`/api/orders/user/${user.id}/confirm`, orderData);
            alert("Comandă trimisă!");
            fetchCart();
              // Resetează coșul
        setCartItems([]);  // Golește coșul
        setTotalPrice(0);  // Resetează totalul
        } catch (error) {
            alert('Eroare!');
        }
    };

    // Resetarea câmpurilor la null când ajungi pe pagina de coș
    useEffect(() => {
        setAddress('');
        setCity('');
        setPhone('');
    }, []);

return (
   <Container className="cart-container mt-5">
        <h1>Cosul meu</h1>
        <br></br>
        {cartItems.map((item) => (
            <Row key={item.id} className="cart-item align-items-center py-2">
                <Col xs={2} className="cart-item-image">
                    <Image
                        src={item.Product.image || 'https://via.placeholder.com/150'}
                        alt={item.Product.name}
                        style={{ width: '100px', height: 'auto' }}
                        fluid
                    />
                </Col>
                <Col xs={4}>
                    <strong>{item.Product.name}</strong>
                    <div>{item.Product.description || 'No description available'}</div>
                </Col>
                <Col xs={2}>
                    <div>{item.Product.price} RON</div>
                </Col>
                <Col xs={2}>
                    <select
                        value={item.quantity}
                        onChange={(e) => changeQuantity(e.target.value, item.Product.id)}
                        className="form-select"
                    >
                        {[...Array(item.Product.stock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                                {x + 1} buc.
                            </option>
                        ))}
                    </select>
                </Col>
                <Col xs={1}>
                    <strong>{item.Product.price * item.quantity} RON</strong>
                </Col>
                <Col xs={1} className="cart-item-actions">
                    <Button   onClick={() => handleRemoveFromCart(item.Product.id)}>
                        Sterge
                    </Button>
                </Col>
            </Row>
        ))}
        <Row className="total-section">
            <Col>
            <p>Cost produse: {totalPrice} RON</p>
            <p>Cost livrare: 10 RON</p>
                <h3>Total: {totalPrice + 10} RON</h3>
                <Button onClick={handleCheckout}>Comanda</Button>
                <br></br>
            </Col>
        </Row>
        <Row className="checkout-form">
            <Col>
                <h4>Completeaza detaliile pentru livrare:</h4>
                <Form>
                    <Form.Group controlId="address">
                        <Form.Label>Adresa</Form.Label>
                        <Form.Control
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Introduceti adresa"
                        />
                    </Form.Group>
                    <Form.Group controlId="city">
                        <Form.Label>Oras</Form.Label>
                        <Form.Control
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Introduceti orasul"
                        />
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Telefon</Form.Label>
                        <Form.Control
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Introduceti numarul de telefon"
                        />
                    </Form.Group>
                    <br></br>
                </Form>
            </Col>
        </Row>
        <Row className="delivery-info">
            <br></br>
    <Col>
        <h5>Detalii livrare:</h5>
        <p>
            Livrarea se face standard la adresa completata.
        </p>
        <p>
        Plata se va efectua ramburs la livrare.
        </p>
    </Col>
</Row>
    
    </Container>
    
);
}

export default CartPage;
