import React, { useState } from 'react';
import AuthenticationService from '../services/AuthenticationService'
import { useHistory } from 'react-router-dom';

const LoginComponent = () => {
    const history = useHistory();
    const[ username, setUsername ] = useState('test@mail.com');
    const[ password, setPassword ] = useState('password');
    const[ hasLoginFailed, setHasLoginFailed ] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const loginClicked = (event) => {
        event.preventDefault();
        AuthenticationService
        .executeBasicAuthenticationService(username, password)
        .then(() => {
            AuthenticationService.registerSuccessLogin(username, password);
            setHasLoginFailed(false);
            history.push(`/quizzes`);
        })
        .catch(() => setHasLoginFailed(true))
    };

    return (

        <div>
            <div className="container mt-3">
                <h1 className="display-4">Web Quiz</h1>
                <p className="lead">A webapp using Spring Boot and React</p>
            </div>
            <div className="card">
                <div className="card-body px-lg-5">
                    <h4 className="card-title mb-4 mt-1">
                        <strong>Sign in</strong>
                    </h4>
                    <form onSubmit={loginClicked}>
                    {hasLoginFailed && <p class="text-danger text-center">Your credentials are invalid, try again.</p>}
                    <div className="form-group">
                        <label>Email</label>
                        <input value={username} onChange={handleUsernameChange} className="form-control" type="email" name="username"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input value={password} onChange={handlePasswordChange} className="form-control" type="password" name="username"/>
                    </div>
                    <button className="btn btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;