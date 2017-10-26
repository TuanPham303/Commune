import React, {Component} from 'react';

function NavLinks({ currentUser, handleLogout }) {
  const { id, first_name, last_name } = currentUser || {}; // cause jquery error when not logged in I think

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
  } else {
    return(
      <ul className="navbar-nav mr-auto navbar-float-right">
        <li className="nav-item">
          <a className="nav-link" href="#">Become a Host</a>
        </li>
        <li className="nav-item">
          <div className="nav-link">{first_name} {last_name}</div>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    )
  }
}

export default NavLinks;