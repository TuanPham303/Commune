import React, {Component} from 'react';
import { Link } from 'react-router-dom';

function NavLinks({ currentUser, handleLogout }) {
  const { id, first_name, last_name, is_host } = currentUser || {}; // cause jquery error when not logged in I think

  if (id === null) {
    return(
      <ul className="navbar-nav mr-auto navbar-float-right">
        <li className="nav-item" data-toggle="modal" data-target="#loginModal">
          <div className="nav-link">Login</div>
        </li>
        <li className="nav-item" data-toggle="modal" data-target="#signupModal">
          <div className="nav-link">Signup</div>
        </li>
      </ul>
    )
  } else if(is_host) {
      return (
        <ul className="navbar-nav nav mr-auto navbar-float-right">
          <li className="nav-item">
            <Link to={`/users/${id}`} className="nav-link">{first_name} {last_name}</Link>
          </li>  
          <li className="nav-item">
            <a className="nav-link" onClick={handleLogout}>Logout</a>
          </li>
          <li className="nav-item dropdown" >
            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#!" role="button" aria-haspopup="true" aria-expanded="false">Hosting</a>
            <div className="dropdown-menu" style={{'border': 'none', 'backgroundColor': '#f8f9fa'}}>
              <a className="dropdown-item" href="#!" data-toggle="modal" data-target="#newEventModal">Create Event</a>
              <a className="dropdown-item" href="#!">Events History</a>
            </div>
          </li>
        </ul>
      )
  } else {
    return(
      <ul className="navbar-nav mr-auto navbar-float-right">
        <li className="nav-item" data-toggle="modal" data-target="#becomeHostModal">
          <div className="nav-link">Become a Host</div>
        </li>
        <li className="nav-item">
          <Link to={`/users/${id}`} className="nav-link">{first_name} {last_name}</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    )
  }
}

export default NavLinks;