import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <div fixed="top">
                <h1 className={styles.heading}>APPY FAMILIES</h1>
            </div>
            <Navbar className={styles.NavBar} expand="md">
                <Container>
                    {/*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto flex-column text-left">
                            <NavLink 
                                exact
                                activeClassName={styles.Active}
                                to="/"
                            >
                                <i class="far fa-sticky-note"></i> Memo
                            </NavLink>
                            <NavLink
                                activeClassName={styles.Active}
                                to="/todo"
                            >
                                <i className="fas fa-list"></i> To Do List
                            </NavLink>
                            <NavLink
                                activeClassName={styles.Active}
                                to="/achievements"
                            >
                                <i className="fas fa-trophy"></i> Achievements
                            </NavLink>
                            <NavLink
                                activeClassName={styles.Active}
                                to="/login"
                            >
                                <i className="fas fa-sign-in-alt"></i> Login
                            </NavLink>
                            <NavLink
                                activeClassName={styles.Active}
                                to="/signup"
                            >
                                <i className="fas fa-user-plus"></i> Signup
                            </NavLink>
                            <NavLink
                                activeClassName={styles.Active}
                                to="about"
                            >
                                <i className="fas fa-info-circle"></i> About
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;