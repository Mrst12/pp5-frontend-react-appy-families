import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import navStyles from '../styles/NavBar.module.css';
import styles from '../styles/NavBarSmall.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import Avatar from './Avatar';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { removeTokenTimestamp } from '../utils/utils';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
            removeTokenTimestamp();
        } catch (err) {
            console.log(err);
        }
    };

    const loggedInIcons = (
        <>
            <NavLink
                to='/memo/create'
                className={navStyles.NavLink}
                activeClassName={navStyles.Active}
                aria-label='create a memo'
                rel='noreferrer'
            >
                <i className="fas fa-plus-circle"></i>
                {' '}
                Create Memo
            </NavLink>
            <NavLink
                to='/achievement/create'
                className={navStyles.NavLink}
                activeClassName={navStyles.Active}
                aria-label='create an achievement'
                rel='noreferrer'
            >
                <i className="fas fa-plus-circle"></i>
                {' '}
                Create an Achievement
            </NavLink>
            <NavLink
                to='/to_do/create'
                className={navStyles.NavLink}
                activeClassName={navStyles.Active}
                aria-label='create a todo item'
                rel='noreferrer'
            >
                <i className="fas fa-plus-circle"></i>
                {' '}
                Create a Task
            </NavLink>
            <NavLink
                to="/"
                className={navStyles.NavLink}
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
                className={navStyles.NavLink}
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
                className={navStyles.NavLink}
                activeClassName={navStyles.Active}
                aria-label="login"
                rel="noreferrer"
            >
                <i className="fas fa-sign-in-alt"></i>
                {''}
                Login
            </NavLink>
            <NavLink
                to="/signup"
                className={navStyles.NavLink}
                activeClassName={navStyles.Active}
                aria-label="sign up"
                rel="noreferrer"
            >
                <i className="fas fa-user-plus"></i>
                {' '}
                Signup
            </NavLink>
            <NavLink
                to="/about"
                className={navStyles.NavLink}
                activeClassName={navStyles.Active}
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
        <div className={styles.Container}>
            <Navbar className={styles.Background} expand="lg" expanded={expanded}>
                <Container className={styles.NavBar}>
                    <Link to="/" className={styles.Heading}>
                        <Navbar.Brand className={styles.Move}>
                            <h1>Appy Families</h1>
                        </Navbar.Brand>
                    </Link>
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
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;