import React, {Component} from 'react';
import NavBar_Events from './NavBar/NavBar_Events.jsx';
import NavBar_PreviewEvent from './NavBar/NavBar_PreviewEvent.jsx';
import NavLinks from './NavLinks.jsx'

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  clickHandler = event => {
    this.refs.query.focus();
  }

  onSearch = event => {
    event.preventDefault();
    this.getSearchResults(this.state.searchString);
    this.setState({ searchString: '' })
    this.refs.query.blur();
  }

  getSearchResults = searchData => {
    const searchValue = searchData.replace(/&/g," ").replace(/  +/g, ' ')
    if (this.state.searchString !== '') {
      $.ajax({
        method: "GET",
        url: `/api/events/navsearch?search=${searchValue}`
      })
      .done(result => {
        this.setState({
          navbarEvents: result
        })
        $('#searchErrMsg').addClass('hidden');
      })
      .fail(error => {
        console.log("Invalid search, try again", error)
      });
    } else {
      this.setState({
        navbarEvents: []
      })
      $('#searchErrMsg').removeClass('hidden');
    }
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
      console.error('Failed to Logout', err);
    })
  }

  glowingText = () => {
    const element = $('.logo');
    let mX, mY, distance;
    $(document).mousemove(function(e) {
      mX = e.pageX;
      mY = e.pageY;
      distance = Math.floor(Math.sqrt(Math.pow(mX - (element.offset().left+(element.width()/2)), 2) + Math.pow(mY - (element.offset().top+(element.height()/2)), 2)));    
      $('.logo').css('text-shadow', '0px 0px ' + distance + 'px #000');
    });
  }

  componentDidMount(){
    this.glowingText();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top navbarContainer">
        <a className="navbar-brand logo" href="/">Commune</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <NavLinks currentUser={this.props.currentUser} handleLogout={this.handleLogout}/>
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
                  getEvent={this.props.getEvent}
                />
                <span className='redErrMsg hidden' id='searchErrMsg'>No events found</span>
              </div>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;