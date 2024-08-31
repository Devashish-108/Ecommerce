import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import Iconhome from "./image/HomeIcon.jsx";
import Iconuser from "./image/UserIcon.jsx";
import IconCart from "./image/CartIcon.jsx";
import icon from "./image/icon.png" ;
import { Switch } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = !darkMode ? "#333" : "#fff";
    document.body.style.color = !darkMode ? "#fff" : "#000";
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <div className="d-flex align-items-center">
              <Link to="/" className="navbar-brand d-flex align-items-center">
                <img
                  src={icon}
                  alt=""
                  className="img10"
                  style={{
                    width: '50px',
                    backgroundBlendMode: 'lighten',
                    borderRadius: '50%',
                    transition: '1s ease all',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                />
                <span style={{ color: darkMode ? 'white' : 'black', fontSize: '1.25rem' }}>Daily Grocer</span>
              </Link>
              <Switch checked={darkMode} onChange={toggleDarkMode} style={{ marginLeft: 'auto' }} />
              <span style={{ color: darkMode ? 'white' : 'black', marginLeft: '8px', alignSelf: 'center' }}>Dark Mode</span>
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  style={{ color: darkMode ? "white" : "black" }}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                  style={{ color: darkMode ? "white" : "black" }}
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to={"/categories"}
                      style={{ color: darkMode ? "lightgreen" : "green", fontWeight: "bold" }}
                    >
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                        style={{ color: darkMode ? "lightgray" : "black" }}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link" style={{ color: darkMode ? "white" : "black" }}>
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" style={{ color: darkMode ? "white" : "black" }}>
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none", color: darkMode ? "white" : "black" }}
                    >
                      <Iconuser />
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                          className="dropdown-item"
                          style={{ color: darkMode ? "lightgray" : "black" }}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                          style={{ color: darkMode ? "lightgray" : "black" }}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink
                    to="/cart"
                    className="nav-link"
                    style={{ color: darkMode ? "white" : "black" }}
                  >
                    <IconCart />
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
