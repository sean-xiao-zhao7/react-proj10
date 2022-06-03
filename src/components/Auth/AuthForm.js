import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");
    const emailRef = useRef();
    const passwordRef = useRef();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        if (!emailRef.current.value) {
            setError("Email cannot be empty.");
        }
        if (!passwordRef.current.value) {
            setError((preError) => {
                return "Password cannot be empty.\n" + preError;
            });
        }
        try {
            if (isLogin) {
                // login
                authHelper("login");
            } else {
                // register
                authHelper("register");
            }
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const authHelper = async (mode) => {
        const result = await fetch(
            mode === "login"
                ? process.env.REACT_APP_FBL
                : process.env.REACT_APP_FBR,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                    returnSecureToken: true,
                }),
            }
        );
        const data = await result.json();
        if (!result.ok) {
            console.log(data.error.message);
            throw new Error("Auth server error.");
        }
        console.log(data);
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" required ref={emailRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        ref={passwordRef}
                    />
                </div>
                {error && <div>{error}</div>}
                <div className={classes.actions}>
                    <button>{isLogin ? "Login" : "Create Account"}</button>
                    <button
                        type="button"
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin
                            ? "Create new account"
                            : "Login with existing account"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
