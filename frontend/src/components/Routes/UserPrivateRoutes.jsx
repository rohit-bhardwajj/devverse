import axios from "axios";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";

export default function UserPrivateRoutes() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [auth] = useAuth(false);

    useEffect(() => {
        // Function to check user authentication
        const checkAuthentication = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API}/api/v1/auth/user-auth`,
                    {
                        headers: {
                            Authorization: auth?.token, // Sending the user token in the request headers
                        },
                    }
                );
                setIsAuthenticated(response.data.ok); // Set isAuthenticated based on the response data
            } catch (error) {
                console.error("Error while checking user authentication:", error);
                setIsAuthenticated(false); // Set isAuthenticated to false in case of an error
            }
        };

        // Check authentication only when the token is available
        if (auth?.token) {
            checkAuthentication();
        }
    }, [auth?.token]);

    // Render the nested routes (Outlet) if user is authenticated, otherwise show a Spinner
    return isAuthenticated ? <Outlet /> : <PageNotFound code="403" title="Not Authirised" desc="Login To Access" link="/login" />

}
