import React, { useState } from 'react';
import registrationService from '../services/RegistrationService';
import { useHistory } from 'react-router-dom';

const RegistrationComponent = () => {
    const history = useHistory();
    const[ email, setEmail ] = useState('');
    const[ password, setPassword ] = useState('');
    const[ registerFail, setRegisterFail] = useState(false);

    const addUser = (event) => {
        event.preventDefault();

        const newUser = {
            email: email,
            password: password
        };

        registrationService
            .createUser(newUser)
            .then(() => {
                setEmail('');
                setPassword('');
                history.push(`/login`);
            })
            .catch(() => setRegisterFail(true));
    };

    
    
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setRegisterFail(false);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setRegisterFail(false);
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
                        <strong>Sign up</strong>
                    </h4>
                    {registerFail && <p className="text-danger text-center">Invalid data</p>}
                    <form onSubmit={addUser}>
                        <div className="form-group">
                            <label>Email</label>
                            <input onChange={handleEmailChange} className="form-control" type="text" name="username"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input onChange={handlePasswordChange} className="form-control" type="password" name="username"/>
                        </div>
                        <button type="submit" className="btn btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegistrationComponent;