import React from 'react';
import { useSelector} from 'react-redux';
import {useGetUserInformationQuery} from "../store/features/user/userApi";

function ProfilePage() {

   // const user = useSelector((state) => state.auth.user);
    const { data: user, error, isLoading } = useGetUserInformationQuery();



    return (
        <div className="container mt-5">
            <h2>Welcome</h2>
            <p>This protected page contains your profile information</p>
            <p><small>Username: </small> <span className="userinfo">{ user?.username }</span></p>
            <p><small>Role:</small> <span className="userinfo">{ user?.role }</span></p>
            {/* Display user information here */}
        </div>
    );
}

export default ProfilePage;
