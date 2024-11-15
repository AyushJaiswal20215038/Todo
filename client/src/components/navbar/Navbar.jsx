import React, { useState } from "react";
import "./Navbar.css";
import { FaBook } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const Navbar = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const logout = () => {
    dispatch(authActions.logout());
    sessionStorage.clear("id");
    sessionStorage.clear("jwttoken");
  };

  const [dark, setdark] = useState(true);
  const darkfilter = () => {
    // console.log(dark);
    if (dark) {
      document.getElementById("root").style.cssText =
        "filter: invert(1) hue-rotate(180deg) !important; background-color: ivory;";
    } else {
      document.getElementById("root").style.cssText =
        "filter: none; background-color: none;";
    }
    setdark(!dark);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <b>
              <FaBook /> &nbsp; todoLIST
            </b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link className="nav-link active " aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link
                  className="nav-link active "
                  aria-current="page"
                  to="/about"
                >
                  About Us
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link
                  className="nav-link active "
                  aria-current="page"
                  to="/todo"
                >
                  Todos
                </Link>
              </li>
              <li
                className="nav-item mx-2 darkmode-container"
                onClick={darkfilter}
              >
                <span className="nav-link active darkmode py-10">
                  {dark ? "☀︎" : "☾"}
                </span>
              </li>
              {!isLoggedIn && (
                <>
                  <li className="nav-item mx-2">
                    <Link
                      className="nav-link active btn-nav"
                      aria-current="page"
                      to="/signup"
                    >
                      SignUp
                    </Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link
                      className="nav-link active btn-nav"
                      aria-current="page"
                      to="/signin"
                    >
                      SignIn
                    </Link>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <>
                  <li className="nav-item mx-2" onClick={logout}>
                    <Link
                      className="nav-link active btn-nav"
                      aria-current="page"
                      to="/"
                    >
                      LogOut
                    </Link>
                  </li>
                </>
              )}

              {/* <li className="nav-item">
                <Link className="nav-link active " aria-current="page" to="/">
                  <img
                    className="img-fluid user-png"
                    src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
                    alt="/"
                  />
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
