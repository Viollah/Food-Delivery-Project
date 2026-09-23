import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  // const [menu, setMenu] = useState("Home");
  const [menu, setMenu] = useState("Home");
  const {
    getTotalCartAmount,
    userName,
    setUserName,
    setToken,
    searchTerm,
    setSearchTerm,
  } = useContext(StoreContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = () => {
    if (isSearchOpen && searchTerm.trim()) {
      document.getElementById("food-display")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    setIsSearchOpen(true);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    setToken("");
    setUserName("");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#app-download"
          onClick={() => setMenu("Mobile-App")}
          className={menu === "Mobile-App" ? "active" : ""}
        >
          Mobile-App
        </a>
        <a
          href="footer"
          onClick={() => setMenu("Contact-Us")}
          className={menu === "Contact-Us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search">
          {isSearchOpen && (
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search dishes"
              aria-label="Search dishes"
              autoFocus
            />
          )}
          <button
            type="button"
            className="navbar-search-button"
            onClick={handleSearch}
            aria-label="Search dishes"
          >
            <img src={assets.search_icon} alt="" />
          </button>
        </div>
        <div className="narbar-search-icon">
          <Link to="/cart">
            {" "}
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {userName ? (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <span>{userName}</span>
            <button
              type="button"
              className="navbar-logout"
              onClick={handleLogout}
              title="Logout"
              aria-label="Logout"
            >
              <img src={assets.logout_icon} alt="" />
            </button>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
