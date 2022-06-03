import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const MainNavigation = () => {
    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext.token;
    const logoutHandler = () => {
        authContext.logout();
    };

    return (
        <header className={classes.header}>
            <Link to="/">
                <div className={classes.logo}>React Auth</div>
            </Link>
            <nav>
                <ul>
                    {!isLoggedIn && (
                        <li>
                            <Link to="/auth">Login</Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    )}
                    <li>
                        {isLoggedIn && (
                            <button onClick={logoutHandler}>Logout</button>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
