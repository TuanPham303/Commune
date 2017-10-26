import React, {Component} from 'react';

class NavBar extends Component {

  
  
  handleLogout = event => {
    $.ajax({
      method: "POST",
      url: "/api/users/logout",
      success: () => {
        this.props.clearUser()
      }
    })
    .fail(err => {
      console.log('Failed to Logout', err);
    })
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top navbarContainer">
        <a className="navbar-brand logo" href="/">Commune</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto navbar-float-right">
            <li className="nav-item active">
              <a className="nav-link" href="#">Become a Host <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item" data-toggle="modal" data-target="#loginModal">
              <div className="nav-link">Login</div>
            </li>
            <li className="nav-item">
              <div className="nav-link">{this.props.currentUser.first_name} {this.props.currentUser.last_name}</div>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={this.handleLogout}>Logout</a>
            </li>
          </ul>
        </div>

        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"></input>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
    );
  }
}

export default NavBar;