import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">
            MIT Fantasy Baseball
          </Link>
          <div>
            <ul class="navbar-nav ml-auto">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/contact" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/contact">
                  Contact
                </Link>
                
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/Draft" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Draft">
                  Draft
                </Link>
                
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/Keepers" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Keepers">
                  Keepers
                </Link>
                
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/Rules" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Rules">
                  Rulebook
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
