import React, {Component} from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      searchString: ''
    }
  }

  changeHandler = event => {
    this.setState({ searchString: event.target.value })
  }

  blurHandler = event => {
    this.setState({ isSearching: true })
  }

  clickHandler = event => {
    this.refs.query.focus();
  }

  onSearch = event => {
    event.preventDefault();
    
    this.props.getSearchResults(this.state.searchString); 
    this.setState({ searchString: '' })
  }
  
  render() {
    const isSearching = this.state.isSearching;

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
        <div className="btn-group search-button">
          <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" onClick={this.clickHandler} aria-haspopup="true" aria-expanded="false">
            Search
          </button>
          <div className="dropdown-menu" id="dropdown-menu">
            <form className="px-4 py-3" onSubmit={this.onSearch} >
              <div className="form-group">
                <input className="form-control" id="navbar-searchbox" ref="query" type="text" placeholder="Search" name="query" type="text" name="query" value={this.state.searchString} onChange={this.changeHandler} onBlur={this.blurHandler}></input>
                <button className="dropdown-item" type="button">Action</button>
              </div>
              <div>
                The user is <b>{isSearching ? 'now' : ''}</b> searching.
              </div>
            </form>
          </div>
        </div>

      </nav>
    );
  }
}

export default NavBar;