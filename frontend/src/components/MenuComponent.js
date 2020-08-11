import React from 'react';
import AuthenticationService from '../services/AuthenticationService';
import { Link, withRouter } from 'react-router-dom';

const MenuComponent = () => {
  
  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-header">
            <a href="/quizzes" className="navbar-brand">Webquiz</a>
          </div>
     
          {isUserLoggedIn && 
          <ul className="nav navbar-nav mr-auto">
            <li className="active"><Link className="nav-link" to="/quizzes">All Questions</Link></li>
            <li className="active"><Link className="nav-link" to="/completion">Completed Questions</Link></li>
            <li className="active"><Link className="nav-link" to="/create">Create New Question</Link></li>
          </ul>
          }
          
          <ul className="nav navbar-nav navbar-right">
            <li className="active"><a href="/user" className="nav-link">{AuthenticationService.getLoggedInUsername()}</a></li>
            {!isUserLoggedIn && <li className="active"><Link className="nav-link" to="/login">Login</Link></li>}
            {!isUserLoggedIn && <li className="active"><Link className="nav-link" to="/register">Sign up</Link></li>}
            {isUserLoggedIn && <li className="active"><Link className="nav-link" to="/login" onClick={AuthenticationService.logout}>Logout</Link></li>}
          </ul>
        </div>
      </nav>
    </>
    );
  };

  export default withRouter(MenuComponent);