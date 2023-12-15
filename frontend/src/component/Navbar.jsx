import React from 'react'
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light text-white fixed-top  ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/signup">
                  Signup
                </NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <section id="section1">

      </section>

      <section id="section2">

      </section>

      <section id="section3">

      </section>

      <section id="section4">

      </section> */}

    </div>
  )
}

export default Navbar;
