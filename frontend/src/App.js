import React from 'react';
import './App.css';
import MenuComponent from './components/MenuComponent';
import FetchQuizzes from './components/FetchQuizzes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import RegistrationComponent from './components/RegistrationComponent';
import FetchCompletion from './components/Completion';
import FetchQuizDetail from './components/FetchQuizDetail';
import CreateQuiz from './components/CreateQuiz';
import FooterComponent from './components/FooterComponent';

const App = () => {
  let styles = {
    minHeight: '90vh'
  };

  return (
    <Router>
      <>
        <MenuComponent />
        <div className="d-flex justify-content-center" style={styles}>
          <Switch>
            <Route path="/" exact component={LoginComponent} />
            <Route path="/login" exact component={LoginComponent} />
            <AuthenticatedRoute path="/quizzes" exact component={FetchQuizzes} />
            <AuthenticatedRoute path="/quizzes/:id" component={FetchQuizDetail} />
            <AuthenticatedRoute path="/completion" exact component={FetchCompletion} />
            <AuthenticatedRoute path="/create" exact component={CreateQuiz} />
            <Route path="/register" exact component={RegistrationComponent} />
          </Switch>
        </div>
        <FooterComponent />
      </>
    </Router>
  )
}
export default App;