import React, { useState } from "react";
import "./navbar1.css";
import Logo from "./logo1.jpg";
// import Details from '../patient/Details';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function Navbar1() {
  const [isopen, setisopen] = useState(false);
  const toggle = () => {
    setisopen(!isopen);
  };
  return (
    <nav>
      <Router>
        <input type="checkbox" id="check" />
        <label htmlFor="check" class="checkbtn">
          <i class="fa-solid fa-bars"></i>
        </label>
        <label className="logo">
          <img src={Logo} alt="logo" />
        </label>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/contact">Contact us</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li>
            <Link to="/details" className="button" onClick={toggle}>
              <i class="fa-regular fa-user"></i>
            </Link>
          </li>
          <ul className={`menu-nav ${isopen ? " show-menu" : ""}`}>
            <div className="items">
              <div className="profilephoto">
                <img src={Logo} alt="" />
              </div>
              <hr />
              <p>Email</p>
              <hr style={{ color: "black" }} />
              <p>Disease</p>
              <hr />
              <p>Mobile Number</p>
              <hr />
              <a href="">
                <p>
                  Logout <i class="fa-solid fa-right-from-bracket"></i>
                </p>
              </a>
            </div>
          </ul>
        </ul>
        
      </Router>
    </nav>
  );
}

export default Navbar1;
