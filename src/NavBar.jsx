import React, {Component} from 'react';
import NavBar_Events from './NavBar/NavBar_Events.jsx';
import NavBar_PreviewEvent from './NavBar/NavBar_PreviewEvent.jsx';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      searchString: '',
      navbarEvents: [],
      currentUser: {
        id: null,
        first_name: '',
        last_name: ''
      },
    }
  }

  componentDidMount(){
    this.getCurrentUser();
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
    
    this.getSearchResults(this.state.searchString); 
    this.setState({ searchString: '', navbarEvents: [] })
    this.refs.query.blur();
  }

  getSearchResults = searchData => {
    console.log(searchData)
    const searchValue = searchData.replace(/&/g," ").replace(/  +/g, ' ')
    $.ajax({
      method: "GET",
      url: `/api/events/search?search=${searchValue}`
    })
    .done(result => {
      console.log("my result from search is", result);
      this.setState({
        navbarEvents: this.state.navbarEvents.concat(result),
      })
    })
    .fail(e => {
      console.error(e);
    });
  }


  getCurrentUser = () => {
    $.ajax({
      method: "GET",
      url: "/api/users/current"
    })
    .done(result => {
      this.setState({
        currentUser: {
          id: result.id,
          first_name: result.first_name,
          last_name: result.last_name
        }
      });
    })
    .fail(err => {
      console.log('Failed to Logout', err);
    })
  }
  
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
            <li className="nav-item" data-toggle="modal" data-target="#loginModal">
              <div className="nav-link">Login</div>
            </li>
            <li className="nav-item">
              <div className="nav-link">{this.state.currentUser.first_name} {this.state.currentUser.last_name}</div>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={this.handleLogout}>Logout</a>
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
                <input className="form-control navbar-searchbox" ref="query" type="text" placeholder="Search" name="query" type="text" name="query" value={this.state.searchString} onChange={this.changeHandler} onBlur={this.blurHandler}></input>
                <NavBar_Events
                  navbarEvents={this.state.navbarEvents}
                  getSearchResults={this.getSearchResults}
                  createEventDetail={this.props.createEventDetail}
                />
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