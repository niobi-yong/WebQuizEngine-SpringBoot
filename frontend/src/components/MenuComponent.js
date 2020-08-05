import React from 'react';
import AuthenticationService from '../services/AuthenticationService';
import { Link, withRouter } from 'react-router-dom';

const Header = () => {
  
  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light border-bottom">
        <div className="container-fluid">
          <div className="navbar-header">
            <a href="/quizzes" className="navbar-brand">Webquiz</a>
          </div>
          <ul className="nav navbar-nav">
            <li className="active"><Link className="nav-link" to="/completion">Show my completed questions</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/user" className="nav-link">{AuthenticationService.getLoggedInUsername()}</a></li>
            {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
            {!isUserLoggedIn && <li><Link className="nav-link" to="/register">Sign up</Link></li>}
            {isUserLoggedIn && <li><Link className="nav-link" to="/login" onClick={AuthenticationService.logout}>Logout</Link></li>}
          </ul>
        </div>
      </nav>
    </>
    );
  };

  export default withRouter(Header);