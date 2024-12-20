import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import DataSorting from '../components/DataSorting';
import { sortingOptions } from '../constants/sort';
import Filters from '../components/Filters';

function Homepage() {
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState({ logged: false, admin: false, id: undefined});
   
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sorting, setSorting] = useState(sortingOptions[0]);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axiosInstance.get('/api/products');
            if (response.status == 200)
                setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

    const displayedProducts = [...filteredProducts].sort((a,b) => {
        if(sorting.order === "asc"){
            return a[sorting.key] - b[sorting.key];
        }
        else {
            return b[sorting.key] - a[sorting.key];

        }
    });


    const addToCart = async (productId) => {
        try {
            const response = await axiosInstance.post(`/api/orders/user/${user.id}/cart`, { productId, quantity: 1, plus: true ,address,city,phone});
            navigate("/cart")
        } catch (error) {
            alert('Eroare!');
        }
    };
    const address = 'default'; // Exemplu de adresă
    const city = 'default'; // Exemplu de oraș
    const phone = 'default'; // Exemplu de telefon

   

    useEffect(() => {
        const verifyUser = () => {

            if (token) {
                const decoded = jwtDecode(token);
                if (decoded) {
                    setUser({ 
                        admin: decoded.role === 'admin', 
                        logged: true, 
                        id: decoded.id,
                    });

                    if (decoded.role === 'admin') {
                        navigate("/admin");
                    }
                } else {
                    console.error('JWT decoding failed:', error);
                    localStorage.removeItem('token');
                    setUser({ admin: false, logged: false });
                    navigate("/login");
                }
            } else {
                setUser({ admin: false, logged: false });
                navigate("/login");
            }
        };
        verifyUser();
    }, [token]);



   



    return (
        <Container className="mt-5">
             <div style={{ margin: 0, padding: 0 }}>
                <img
            src="https://www.tasaki-global.com/pub/media/catalog/category/jewellery/jewellery_collection_line_kv_v2.jpg" // Înlocuiește cu URL-ul imaginii dorite
            alt="Imagine homepage"
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        marginBottom: '20px',
                    }}
                />
            </div>
            <h1>Produse</h1>

            <Filters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <DataSorting setSorting={(id) => setSorting(sortingOptions.find(option => option.id === id))} />
                        
            <Row>
                {displayedProducts.map((product) => (
                    <Col key={product.id} md={4}>
                        <Card className="mb-3" style={{ width: '25rem' }}>
                            <Card.Img variant="top" style={{ height: '200px', width: '100%', objectFit: 'contain' }} src={product.image} />
                            <Card.Body className="Card-Body" >
                                <Card.Title >{product.name}</Card.Title>
                                <Card.Text>{product.price} RON</Card.Text>
                                <Button variant="primary" onClick={() => addToCart(product.id)}>
                                    Adauga in cos
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Homepage;
