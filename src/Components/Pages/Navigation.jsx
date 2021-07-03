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
                  props.location.pathname === "/draft" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/draft">
                  Draft
                </Link>
                
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/keepers" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/keepers">
                  Keepers
                </Link>
                
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/stats" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/stats">
                  Stats
                </Link>
                
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/history" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/history">
                  History
                </Link>
                
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/rules" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/rules">
                  Rules
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
