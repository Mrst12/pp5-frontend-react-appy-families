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
                            <Nav.Link>
                            <i class="far fa-sticky-note"></i> Memo
                            </Nav.Link>
                            <Nav.Link>
                            <i className="fas fa-list"></i> To Do List
                            </Nav.Link>
                            <Nav.Link>
                            <i className="fas fa-trophy"></i> Achievements
                            </Nav.Link>
                            <Nav.Link>
                            <i className="fas fa-sign-in-alt"></i> Login
                            </Nav.Link>
                            <Nav.Link>
                            <i className="fas fa-user-plus"></i> Signup
                            </Nav.Link>
                            <Nav.Link>
                            <i className="fas fa-info-circle"></i> About
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;