/**
 * Higher order component that requires the user to be authenticated
 * before rendering the component. Redirects to /login if not authenticated.
 */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const  RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return(
        auth?.email 
        ? <Outlet /> 
        : <Navigate to = "login" state = {{ from: location }} replace />
    );
}

export default RequireAuth;