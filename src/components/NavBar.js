import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavBar = () => {
    return (
        <div>
            <div fixed="top">
                <h1>APPY FAMILIES</h1>
            </div>
            <Navbar bg="light" expand="md">
                <Container>
                    {/*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto flex-column text-left">
                            <Nav.Link>Memo</Nav.Link>
                            <Nav.Link>To Do List</Nav.Link>
                            <Nav.Link>Achievements</Nav.Link>
                            <Nav.Link>Login</Nav.Link>
                            <Nav.Link>Signup</Nav.Link>
                            <Nav.Link>About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;