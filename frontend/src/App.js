import React from 'react';
import './App.css';
import MenuComponent from './components/MenuComponent.js';
import FetchQuizzes from './components/FetchQuizzes.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import RegistrationComponent from './components/RegistrationComponent';
import FetchCompletion from './components/Completion';

const App = () => {  
  return (
    <Router>
      <div>
        <MenuComponent />
        <div className="d-flex justify-content-center">
          <Switch>
            <Route path="/" exact component={LoginComponent} />
            <Route path="/login" exact component={LoginComponent} />
            <AuthenticatedRoute path="/quizzes" exact component={FetchQuizzes} />
            <AuthenticatedRoute path="/completion" exact component={FetchCompletion} />
            <Route path="/register" exact component={RegistrationComponent} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}
export default App;