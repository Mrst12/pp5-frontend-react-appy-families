import styles from './App.module.css';
import NavBar from './components/NavBar';
import NavBarSmall from './components/NavBarSmall';
import Container from 'react-bootstrap/Container';
import { NavLink, Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import MemoCreateForm from './pages/memo/MemoCreateForm';
import AchievementCreateForm from './pages/achievements/AchievementCreateForm';
import AchievementsPage from './pages/achievements/AchievementsPage';
import AchievementsPostsPage from './pages/achievements/AchievementsPostsPage';
import AchievementEditForm from './pages/achievements/AchievementEditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import MemoPostPage from './pages/memo/MemoPostPage';
import MemoPostsPage from './pages/memo/MemoPostsPage';
import MemoEditForm from './pages/memo/MemoEditForm';
import TodoCreateForm from './pages/to_do/TodoCreateForm';
import TodoPostPage from './pages/to_do/TodoPostPage';
import TodoPostsPage from './pages/to_do/TodoPostsPage';
import TodoEditForm from './pages/to_do/TodoEditForm';
import About from './pages/About';
import { Col, Row } from 'react-bootstrap';
import FamilyProfiles from './pages/profiles/FamilyProfiles';
import NotFound from './components/NotFound';


function App() {
  return (
    <div className={styles.App}>
      {/* heading */}
      <Row>
        {/*large screens*/}
        <Col className={`${styles.HeadingLgScreen} ${styles.Heading}`}>
          <NavLink to="/" className={styles.HeadingLink}>
            <h1>Appy Families</h1>
          </NavLink>
        </Col>

        {/* small screens */}
        <Col sm={12} className={`${styles.SmHeading} ${styles.NavSmScreen}`}>
          <NavBarSmall />
        </Col>
      </Row>
      <br />

      <Row className={styles.MainContent}>
        {/*Navbar */}
        <Col lg={3} className={`${styles.LeftSide} ${styles.NavLgScreen}`}>
          < NavBar />
        </Col>

        {/*main content*/}
        <Col sm={12} md={8} lg={6} className={styles.Middle}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <MemoPostsPage message="No results found. Adjust the search keyword." />
              )}
            />
            <Route
              exact
              path="/to_do"
              render={() => (
                <TodoPostsPage message="No results found. Adjust the search keyword" />
              )}
            />
            <Route
              exact
              path="/achievements"
              render={() => (
                <AchievementsPostsPage message="No results found, please adjust the search keyword" />
              )}
            />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/login" render={() => <SignInForm />} />
            <Route exact path="/memo/create" render={() => <MemoCreateForm />} />
            <Route exact path="/achievement/create" render={() => <AchievementCreateForm />} />
            <Route exact path="/achievements/:id" render={() => <AchievementsPage />} />
            <Route exact path="/achievements/:id/edit" render={() => <AchievementEditForm />} />
            <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
            <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />} />
            <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />} />
            <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />} />
            <Route exact path="/memo_posts/:id" render={() => <MemoPostPage />} />
            <Route exact path="/memo_posts/:id/edit" render={() => <MemoEditForm />} />
            <Route exact path="/to_do/create" render={() => <TodoCreateForm />} />
            <Route exact path="/to_do/:id" render={() => <TodoPostPage />} />
            <Route exact path="/to_do/:id/edit" render={() => <TodoEditForm />} />
            <Route render={() => <NotFound />} />
          </Switch>
        </Col>

        {/* Family profiles*/}
        <Col md={4} lg={3} className={styles.RightSide}>
          <FamilyProfiles />
        </Col>
        </Row>
    </div>

  );
}

export default App;