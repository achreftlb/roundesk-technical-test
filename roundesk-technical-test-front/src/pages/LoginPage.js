import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../store/features/user/userApi';
import { setCredentials } from '../store/features/auth/authSlice';
import {Link, useHistory} from 'react-router-dom';
import {useLocation} from "react-router-dom/cjs/react-router-dom";

function LoginPage() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loginUser] = useLoginUserMutation();
    const dispatch = useDispatch();
    const history = useHistory();

    const location = useLocation();
    const [flashMessage, setFlashMessage] = useState('');
    useEffect(() => {
        if (location.state?.registeredSuccessfully) {
            setFlashMessage('You have registered successfully.');
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userData = await loginUser({ username: login, password: password }).unwrap();
            dispatch(setCredentials({ user: userData.user, token: userData.access_token }));
            history.push('/');
        } catch (err) {
            console.log(err.data)
            setError(err.data ? err.data.message : 'Failed to login');
        }
    };

    return (
        <div className="row mt-5 justify-content-center ">
            <div className=" col-10 col-md-7 col-lg-5">
                {flashMessage && <div className="alert alert-success">{flashMessage}</div>}
                <div className="card" style={{ width: "auto" }}>
                <div className="card-header text-center">
                    Sign in
                </div>
                <div className="card-body">
                    <div className="p-4 p-md-5">
                        <form onSubmit={handleSubmit} className="mb-3">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="Username" id="username" value={login} onChange={(e) => setLogin(e.target.value)} />
                            </div>
                            <div className="form-group mb-3">
                                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <div className="form-goup">
                                <button type="submit" className="form-control btn btn-primary rounded submit px-3">Login</button>
                            </div>

                        </form>
                        <p className="text-center">Not a member? <Link className="b-link" to={'/register'} >Sign Up</Link></p>
                    </div>
                </div>
            </div>
            </div>
        </div>


    );
}

export default LoginPage;
