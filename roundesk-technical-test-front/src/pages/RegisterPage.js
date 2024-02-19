import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useRegisterUserMutation} from '../store/features/user/userApi';

function RegisterPage() {
    const [registerUser, {isLoading, error}] = useRegisterUserMutation();
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        role: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData).unwrap();
            history.push('/login',{ registeredSuccessfully: true  });
        } catch (err) {
            console.error('Failed to register:', err);
        }
    };

    return (
        <div className="row mt-5 justify-content-center ">
            <div className="col-10 col-md-7 col-lg-5">
                <div className="card" style={{ width: "auto" }}>
                    <div className="card-header text-center">
                        Sign up
                    </div>
                    <div className="card-body">
                        <div className="p-4 p-md-5">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="username" placeholder="Username" name="username"
                                       value={formData.username} onChange={handleChange} required/>
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" id="password" placeholder="Password" name="password"
                                       value={formData.password} onChange={handleChange} required/>
                            </div>
                            <div className="form-group mb-3">
                                <select className="form-control" name="role"  value={formData.role}  onChange={handleChange} required >
                                    <option value="" disabled selected>Role</option>
                                    <option value="user" >User</option>
                                    <option value="admin" >Admin</option>
                                    <option value="supervisor" >Supervisor</option>
                                </select>
                            </div>
                            {error && <div className="alert alert-danger"
                                           role="alert">{error.data?.message || 'Error registering'}</div>}
                            <div className="form-goup mb-3">
                                <button type="submit" className="form-control btn btn-primary rounded submit px-3" disabled={isLoading}>Register</button>
                            </div>
                        </form>
                            <p className="text-center">Already a member? <Link className="b-link" to={'/login'} >Sign In</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
