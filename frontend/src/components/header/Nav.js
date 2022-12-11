import React from "react";
import { Link } from "react-router-dom";
import facebook from "../../images/facebook.svg";
import instagram from "../../images/instagram.svg";
import burger from "../../images/burger.svg";
import cross from "../../images/cross.svg";
import logo from "../../images/logo.png";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const Nav = () => {
  const [isActive, setActive] = useState(false);
  const [img, setimg] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const handleClick = () => {
    setIsShown(!isShown);
  };

  const changeUrl = () => {
    handleClick();
  };
  const toggleImg = () => {
    setimg(!img);
  };
  const toggleClass = () => {
    setActive(!isActive);
  };
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="social">
        <a href="https://www.facebook.com/">
          <img src={facebook} alt="facebook" />
        </a>
        <a href="https://www.instagram.com/?hl=fr">
          <img src={instagram} alt="insta" />
        </a>
      </div>

      {isMobile && (
        <nav className="nav_menu">
          <label
            htmlFor="menu_toggle"
            className="nav_label"
            onClick={() => {
              toggleImg();
              handleClick();
            }}>
            <img src={img ? cross : burger} alt="burger_menu" />
          </label>
          <input type="checkbox" id="menu_toggle" />
          <div className={isShown ? "main_pages" : "main_pages_none"}>
            <ul>
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    toggleClass();
                    toggleImg();
                    changeUrl();
                  }}>
                  Acceuil
                </Link>
              </li>
              <li>
                <Link
                  to="/galeries"
                  onClick={() => {
                    toggleClass();
                    toggleImg();
                  }}>
                  Galeries
                </Link>
              </li>
              <li>
                <Link
                  to="/prices"
                  onClick={() => {
                    toggleClass();
                    toggleImg();
                  }}>
                  Prestations
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={() => {
                    toggleClass();
                    toggleImg();
                  }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}

      {isDesktop && (
        <nav className="nav_menu">
          <ul>
            <li>
              <Link to="/">Acceuil</Link>
            </li>
            <li>
              <Link to="/galeries">Galeries</Link>
            </li>
            <li>
              <Link to="/prices">Prestations</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Nav;
