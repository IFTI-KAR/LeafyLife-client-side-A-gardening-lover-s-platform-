import React, { useContext } from 'react'; // ✅ CORRECT

import { AuthContext } from './AuthProvider';
import { Navigate } from 'react-router';
import Loading from '../components/pages/loading';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext); // ✅ CORRECTED

    //console.log(user)

    if (loading){
        return <Loading></Loading>
    }
    if (user && user?.email){
        return children
    }
    return <Navigate to={"/auth/login"}></Navigate>




    
            

       
    
};

export default PrivateRoute;