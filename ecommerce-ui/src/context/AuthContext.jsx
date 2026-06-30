import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState } from 'react'


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    )

    const [role, setRole] = useState(
        localStorage.getItem("role")
    );


    const login = (jwt) => {

        const decoded = jwtDecode(jwt);

        localStorage.setItem("token", jwt);
        localStorage.setItem("role", decoded.role);

        setToken(jwt);
        setRole(decoded.role);
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        setToken(null);
        setRole(null);
    };


    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                login,
                logout,
                isAuthenticated: !!token
            }}

        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
