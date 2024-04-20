import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const [token, setToken] = useLocalStorage("token", null);
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = async ({ token, user }) => {
        setUser(user);
        setToken(token); // Fixed typo: setToken(token) instead of setToken(setToken)
    };

    // call this function to sign out logged in user
    const logout = async () => {
        setUser(null);
        setToken(null);
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            token,
            login,
            logout,
        }),
        [user, token]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
