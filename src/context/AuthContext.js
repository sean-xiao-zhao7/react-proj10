import { createContext, useState, useEffect } from "react";

// global token expire time counter
let expireTimer;

const contextConfig = {
    token: null,
    email: null,
    expiresIn: null,
    login: () => {},
    logout: () => {},
};

export const AuthContext = createContext(contextConfig);

export const AuthProvider = (props) => {
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        const autoLogin = () => {
            const token = localStorage.getItem("token");
            const email = localStorage.getItem("email");
            const expiresIn = localStorage.getItem("expiresIn");
            const timeLeft =
                new Date(expiresIn).getTime() - new Date().getTime();
            console.log(timeLeft);
            expireTimer = setTimeout(logout, timeLeft);
            setToken(token);
            setEmail(email);
        };
        autoLogin();
    }, []);

    const login = (token, email, expiresIn) => {
        setToken(token);
        setEmail(email);
        setExpiresIn(expiresIn);
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("expiresIn", new Date(expiresIn));
    };

    const logout = () => {
        setToken("");
        setEmail("");
        setExpiresIn(null);
        if (expireTimer) {
            clearTimeout(expireTimer);
        }
    };

    const contextState = {
        token: token,
        email: email,
        expiresIn: expiresIn,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextState}>
            {props.children}
        </AuthContext.Provider>
    );
};
