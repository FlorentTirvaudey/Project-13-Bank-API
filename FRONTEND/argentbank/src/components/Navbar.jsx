import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar(props) {

    const { isLoggedIn } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    return (
        <nav className="main-nav">
            <Link to="/">
                <a className="main-nav-logo" href="">
                    <img
                    className="main-nav-logo-image"
                    src={props.logo}
                    alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </a>
            </Link>
            <div>
                {isLoggedIn ? (
                    <Link to="/" onClick={() => dispatch(logout())}>
                        <a className="main-nav-item" href="">
                        <i className="fa fa-user-circle"></i>
                        Logout
                        </a>
                    </Link>
                ) : (
                    <Link to="/login">
                        <a className="main-nav-item" href="">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                        </a>
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;