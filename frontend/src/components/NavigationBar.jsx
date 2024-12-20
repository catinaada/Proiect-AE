import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const NavigationBar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ logged: false, admin: false });

    const onLogOut = () => {
        localStorage.removeItem('token');
        verifyUser()
    };

    const verifyUser = () => {
        const token = localStorage.getItem('token')
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded) {
                setUser({ admin: decoded.role == 'admin', logged: true });
            } else {
                localStorage.removeItem('token')
                setUser({ admin: false, logged: false });
                navigate("/login")
            }
        } else {
            setUser({ admin: false, logged: false });
            navigate("/login")
        }
    }

    useEffect(() => {
        verifyUser()
    }, [localStorage.getItem('token')]);

    return (
        <Navbar className="navbar" expand="lg">
            <Navbar.Brand href="/" className="navbar-brand mx-3">
              My Jewelry
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" className="navbar-toggler" />
            <Navbar.Collapse id="navbarNav" className="mx-3">
                <Nav className="me-auto">
                    {user.logged &&  (
                        <Nav.Link href='/about' className="nav-link d-flex align-items-center my-2 position-relative">
                            Despre noi 
                        </Nav.Link>
                    )}
                </Nav>
                <Nav>
                   
                    {user.logged && !user.admin &&(
                        <Nav.Link href='/' className="nav-link d-flex align-items-center my-2 position-relative">
                            Produse
                        </Nav.Link>
                    )}
                    {user.logged && !user.admin &&(
                        <Nav.Link href='/profile' className="nav-link d-flex align-items-center my-2 position-relative">
                            Profil
                        </Nav.Link>
                    )}
                    {user.logged && !user.admin && (
                        <Nav.Link href='/cart' className="nav-link d-flex align-items-center my-2 position-relative">
                            Cos
                        </Nav.Link>
                    )}
                    {user.logged && (
                        <Nav.Link onClick={onLogOut} className="my-2">
                            {/* <Button variant="outline-danger" className="outline-danger">Log out</Button> */}
                            Log out
                        </Nav.Link>
                    )}
                    {!user.logged && (
                        <Nav.Link href="/login" className="my-2">
                            Log in
                        </Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;