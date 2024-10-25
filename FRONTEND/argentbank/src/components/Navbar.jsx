import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../redux/slices/authentification";

function Navbar(props) {

    const { isLoggedIn, userData } = useSelector((state) => state.auth);

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
                    <div className="flex_row">
                        <Link to="/profil" className="flex_row_mingap">
                            <i className="fa fa-user-circle"></i>
                            <span>{userData.firstname}</span>
                        </Link>
                        <Link to="/" onClick={() => dispatch(logout())}>
                            <div className="main-nav-item" href="">
                            Logout
                            </div>
                        </Link>
                    </div>
                ) : (
                    <Link to="/login">
                        <div className="main-nav-item" href="">
                        Sign In
                        </div>
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;