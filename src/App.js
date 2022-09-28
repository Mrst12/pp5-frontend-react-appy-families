import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import {Route, Switch} from 'react-router-dom';
import './api/axiosDefaults';

function App() {
  return (
    <div className={styles.App}>
      < NavBar />
      <Container>
        <Switch>
          <Route exact path="/" render={() => <h1>Memo page</h1>} />
          <Route exact path="/todo" render={() => <h1>To Do List</h1>} />
          <Route exact path="/achievements" render={() => <h1>Achievements</h1>} />
          <Route exact path="/signup" render={() => <h1>Signup</h1>} />
          <Route exact path="/about" render={() => <h1>About</h1>} />
          <Route exact path="/login" render={() => <h1>Login</h1>} />
          <Route render={()=><p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;