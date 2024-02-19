import React, {useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GuestRoute = ({ component: Component, ...rest }) => {
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

    useEffect(() => {
        console.log((token === undefined || token === null ));
    }, [token]);

    return (
        <Route
            {...rest}
            render={(props) =>
                !token ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
};

export default GuestRoute;
