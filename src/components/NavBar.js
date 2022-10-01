import React, { useEffect, useRef, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import Avatar from './Avatar';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const [expanded, setExpanded] = useState(false);
    const ref = useRef(null)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)){
                setExpanded(false)
            }
        }

        document.addEventListener('mouseup', handleClickOutside)
        return () => {
            document.removeEventListener('mouseup', handleClickOutside)
        }
    }, [ref]);

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const loggedInIcons = (
        <>
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
            <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
                <i className="fas fa-sign-out-alt"></i>Sign out
            </NavLink>
            <NavLink
                className={styles.NavLink}
                to={`/profiles/${currentUser?.profile_id}`}
            >
                <Avatar src={currentUser?.profile_image} text="Profile" height={35} />
            </NavLink>
        </>
    )
    const loggedOutIcons = (
        <>
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
        </>
    );
    return (
        <div>
            <div fixed="top">
                <h1 className={styles.heading}>APPY FAMILIES</h1>
            </div>
            <Navbar expanded={expanded} className={styles.NavBar} expand="md">
                <Container>
                    {/*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}
                    <Navbar.Toggle
                        ref={ref}
                        onClick={() => setExpanded(!expanded)}
                        aria-controls="basic-navbar-nav"
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto flex-column text-left">



                            {currentUser ? loggedInIcons : loggedOutIcons}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;