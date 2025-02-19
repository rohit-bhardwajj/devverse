import axios from "axios";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";

export default function AdminPrivateRoutes() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [auth] = useAuth(false);

    useEffect(() => {
        // Function to check user authentication
        const checkAuthentication = async () => {
            try {
                const res = await axios.get(`/api/v1/users/admin-auth`, {
                    headers: {
                        Authorization: auth?.token
                    }
                })
                setIsAuthenticated(res.data.ok); // Set isAuthenticated based on the response data
            } catch (error) {
                console.error("Error while checking admin authentication:", error);
                setIsAuthenticated(false); // Set isAuthenticated to false in case of an error
            }
        };

        // Check authentication only when the token is available
        if (auth?.token) {
            checkAuthentication();
        }
    }, [auth?.token]);

    // Render the nested routes (Outlet) if user is authenticated, otherwise show a Spinner
    return isAuthenticated ? <Outlet /> : <PageNotFound code="403" title="Not Authirised" desc="Login as Admin" link="/login" />

}

