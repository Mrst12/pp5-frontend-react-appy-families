import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
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


function App() {
  return (
    <div className={styles.App}>
      < NavBar />
      <Container>
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
            path="/todo"
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
          <Route exact path="/todo/create" render={() => <TodoCreateForm />} />
          <Route exact path="/to_do/:id" render={() => <TodoPostPage />} />
          <Route exact path="/to_do/:id/edit" render={() => <TodoEditForm />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>

  );
}

export default App;