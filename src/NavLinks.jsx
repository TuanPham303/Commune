import React, {Component} from 'react';

function NavLinks({ currentUser, handleLogout }) {
  const { id, first_name, last_name, is_host } = currentUser || {}; // cause jquery error when not logged in I think

  if (id === null) {
    return(
      <ul className="navbar-nav mr-auto navbar-float-right">
        <li className="nav-item" data-toggle="modal" data-target="#loginModal">
          <div className="nav-link clickable">Login</div>
        </li>
        <li className="nav-item" data-toggle="modal" data-target="#signupModal">
          <div className="nav-link clickable">Signup</div>
        </li>
      </ul>
    )
  } else if(is_host) {
      return (
        <ul className="navbar-nav nav mr-auto navbar-float-right">
          <li className="nav-item">
            <div className="nav-link notClickable">Hello {first_name} {last_name}!</div>
          </li>
          <li className="nav-item">
            <a className="nav-link clickable" onClick={handleLogout}>Logout</a>
          </li>
          <li className="nav-item" data-toggle="modal" data-target="#newEventModal">
            <a className="nav-link clickable">New Event</a>
          </li>
        </ul>
      )
  } else {
    return(
      <ul className="navbar-nav mr-auto navbar-float-right">
        <li className="nav-item">
          <div className="nav-link notClickable">Hello {first_name} {last_name}!</div>
        </li>
        <li className="nav-item">
          <a className="nav-link clickable" onClick={handleLogout}>Logout</a>
        </li>
        <li className="nav-item" data-toggle="modal" data-target="#becomeHostModal">
          <a className="nav-link clickable">Become a Host</a>
        </li>
      </ul>
    )
  }
}

export default NavLinks;