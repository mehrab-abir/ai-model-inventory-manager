import React from 'react';
import { use } from 'react';
import { AuthContext } from '../Pages/Authentication/AuthContext';
import LoaderSpinner from '../Components/LoaderSpinner';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = use(AuthContext);
    const location = useLocation();

    if(loading){
        return <LoaderSpinner></LoaderSpinner>
    }

    if(user){
        return children;
    }
    else{
        return <Navigate to='/auth/signin' state={location.pathname} replace ></Navigate>
    }
};

export default PrivateRoute;