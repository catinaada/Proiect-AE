import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function AdminPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ logged: false, admin: false });
    const [products, setProducts] = useState([]);
    const [imageBase64, setImageBase64] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        stock: '',
        category:'',
        description: '',
        image: '',
    });

    const fetchProducts = async () => {
        const response = await axiosInstance.get('/api/products');
        if (response.status == 200) {
            setProducts(response.data);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded) {
                if (decoded.role != 'admin') {
                    setUser({ admin: false, logged: true });
                    navigate("/")
                } else {
                    setUser({ admin: true, logged: true });
                }
            } else {
                localStorage.removeItem('token')
                navigate("/signup")
            }
        } else {
            navigate("/signup")
        }

    }, []);

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/api/products', { ...newProduct, image: imageBase64 });
            await fetchProducts()
            setNewProduct({ name: '', price: '', stock: '',category:'', description: '', image: '' });
            alert('Adaugat!');
        } catch (error) {
            console.error(error)
            alert('Failed to add product!', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axiosInstance.delete(`/api/products/${productId}`);
            await fetchProducts()
            alert('Produs sters!');
        } catch (error) {
            alert('Eroare!');
        }
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result);
            };
            reader.readAsDataURL(selectedImage);
        }
    };
    return (
        <Container className="mt-5">
            <h2>Adaugare produs</h2>

            <Form className="mb-4" onSubmit={handleAddProduct}>
                <Row className="mb-3">
                    <Col md={12}>
                        <Form.Label>Nume produs</Form.Label>
                        <Form.Control
                            placeholder="Nume"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            required
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label>Imagine produs</Form.Label>
                        <Form.Control
                            placeholder="Imagine"
                            type='file'
                            value={undefined} 
                            onChange={(event) => {
                                const type = event.currentTarget.files[0].type.toString();
                                if (!type.includes("image")) {
                                    alert("Adauga o imagine!");
                                } else {
                                    handleImageChange(event);
                                }
                            }}
                            required
                        />
                    </Col>

                    <Col md={6}>
                        <Form.Label>Categorie produs</Form.Label>
                        <Form.Select
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            required
                            >
                                <option value="">Selecteaza o categorie</option>
                                <option value="Bratari">Bratari</option>
                                <option value="Cercei">Cercei</option>
                                <option value="Coliere">Coliere</option>
                                <option value="Inele">Inele</option>
                        </Form.Select>

                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label>Pret produs (RON)</Form.Label>
                        <Form.Control
                            placeholder="Pret"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            required
                        />
                    </Col>

                    <Col md={6}>
                        <Form.Label>Stoc produs</Form.Label>
                        <Form.Control
                            placeholder="Stoc"
                            type="number"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                            required
                        />
                    </Col>
                </Row>

                <Row className="mb-3">

                <Col md={6}>
                        <Form.Label>Descriere produs</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Descriere"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                    </Col>

                    
                </Row>


                <Row className="mb-3">
                    <Col md={12}>
                        <Button type="submit" variant="success">Adaugă produs</Button>
                    </Col>
                </Row>
            </Form>

            <h2>Produse existente</h2>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} md={4}>
                        <Card className="mb-3">
                            <Card.Img
                                variant="top"
                                style={{ height: '200px', width: '100%', objectFit: 'contain' }}
                                src={product.image || 'https://via.placeholder.com/150'}
                            />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text><strong>Pret:</strong> {product.price} RON</Card.Text>
                                <Card.Text><strong>Stoc:</strong> {product.stock}</Card.Text>
                                <Card.Text><strong>Categorie:</strong> {product.category}</Card.Text>
                                <Card.Text><strong>Descriere:</strong> {product.description}</Card.Text>
                                <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>
                                    Sterge produs
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}


export default AdminPage;
