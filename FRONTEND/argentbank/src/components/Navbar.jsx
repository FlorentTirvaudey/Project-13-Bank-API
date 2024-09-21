import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../redux/slices/authentification";

function Navbar(props) {

    const { isLoggedIn } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    return (
        <nav className="main-nav">
            <Link to="/">
                <div className="main-nav-logo" href="">
                    <img
                    className="main-nav-logo-image"
                    src={props.logo}
                    alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </div>
            </Link>
            <div>
                {isLoggedIn ? (
                    <Link to="/" onClick={() => dispatch(logout())}>
                        <div className="main-nav-item" href="">
                        <i className="fa fa-user-circle"></i>
                        Logout
                        </div>
                    </Link>
                ) : (
                    <Link to="/login">
                        <div className="main-nav-item" href="">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                        </div>
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;