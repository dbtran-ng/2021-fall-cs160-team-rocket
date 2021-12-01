import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import logo from "../../img/sjsulogo.png";

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i class="fa fa-home"></i> <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/profiles">
          <i class="fa fa-users"></i> Members
        </Link>
      </li>
      <li>
        <Link to="/group">
        <i className="fa fa-dot-circle"></i> Groups
        </Link>
      </li>
      <li>
        <Link to="/event">
          <i class="fa fa-calendar-alt" /> Events
        </Link>
      </li>
      <li>
        <Link to="/group">
          <i class="fa fa-calendar-alt" /> Groups
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/about-us">About Us</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-logo">
      <h1>
        <Link to="/">
          <img className="logo" src={logo} alt="spartanlogo" /> Spartan MeetUp
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
