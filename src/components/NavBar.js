import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import Avatar from './Avatar';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

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
                to='/memo/create'
                className={styles.NavLink}
                activeClassName={styles.Active}
                aria-label='create a memo'
                rel='noreferrer'
            >
                <i className="fas fa-plus-circle"></i>
                {' '}
                Create Memo
            </NavLink>
            <NavLink
                to='/achievement/create'
                className={styles.NavLink}
                activeClassName={styles.Active}
                aria-label='create an achievement'
                rel='noreferrer'
            >
                <i className="fas fa-plus-circle"></i>
                {' '}
                Create an Achievement
            </NavLink>
            <NavLink
                to='/to_do/create'
                className={styles.NavLink}
                activeClassName={styles.Active}
                aria-label='create a todo item'
                rel='noreferrer'
            >
                <i className="fas fa-plus-circle"></i>
                {' '}
                Create a Task
            </NavLink>
            <NavLink
                to="/"
                className={styles.NavLink}
                onClick={handleSignOut}
                aria-label='sign out'
                rel='noreferrer'
            >
                <i className="fas fa-sign-out-alt"></i>
                {' '}
                Sign out
            </NavLink>
            <NavLink
                to={`/profiles/${currentUser?.profile_id}`}
                className={styles.NavLink}
                aria-label='user profile'
                rel='noreferrer'
            >
                <Avatar src={currentUser?.profile_image} text="Profile" height={35} />
            </NavLink>
        </>
    )
    const loggedOutIcons = (
        <>
            <NavLink
                to="/login"
                className={styles.NavLink}
                activeClassName={styles.Active}
                aria-label="login"
                rel="noreferrer"
            >
                <i className="fas fa-sign-in-alt"></i>
                {''}
                Login
            </NavLink>
            <NavLink
                to="/signup"
                className={styles.NavLink}
                activeClassName={styles.Active}
                aria-label="sign up"
                rel="noreferrer"
            >
                <i className="fas fa-user-plus"></i>
                {' '}
                Signup
            </NavLink>
            <NavLink
                to="/about"
                className={styles.NavLink}
                activeClassName={styles.Active}
                aria-label="about page"
                rel="noreferrer"
            >
                <i className='fas fa-info-circle'></i>
                {' '}
                About
            </NavLink>
        </>
    );
    return (
            <Container>
                <Navbar expanded={expanded} expand="lg">
                    <Navbar.Toggle
                        ref={ref}
                        onClick={() => setExpanded(!expanded)}
                        aria-controls="basic-navbar-nav"
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto flex-column text-left">
                            <NavLink
                                exact
                                to="/"
                                className={styles.NavLink}
                                activeClassName={styles.Active}
                                aria-label='home page memos'
                                rel='noreferrer'
                            >
                                <i className="far fa-sticky-note"></i>
                                {' '}
                                Memo
                            </NavLink>
                            <NavLink
                                to="/achievements"
                                className={styles.NavLink}
                                activeClassName={styles.Active}
                                aria-label='achievements page'
                                rel='noreferrer'
                            >
                                <i className="fas fa-trophy"></i>
                                {' '}
                                Achievements
                            </NavLink>
                            <NavLink
                                to="/to_do"
                                className={styles.NavLink}
                                activeClassName={styles.Active}
                                aria-label='todo page'
                                rel='noreferrer'
                            >
                                <i className="fas fa-list"></i>
                                {' '}
                                To Do List
                            </NavLink>

                            {currentUser ? loggedInIcons : loggedOutIcons}

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
    );
};

export default NavBar;