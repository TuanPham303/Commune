import React, {Component} from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ''
    }
  }

  changeHandler = event => {
    this.setState({ searchString: event.target.value })
  }

  onSearch = event => {
    event.preventDefault();
    this.props.getSearchResults(this.state.searchString);
    this.setState({ searchString: '' })
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
            <li className="nav-item">
              <div className="nav-link">User's Name</div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Log out</a>
            </li>
          </ul>
        </div>

        <form className="form-inline my-2 my-lg-0" onSubmit={this.onSearch} >
          <input className="form-control mr-sm-2" type="text" placeholder="Search" name="query" type="text" name="query" value={this.state.searchString} onChange={this.changeHandler}></input>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
    );
  }
}

export default NavBar;