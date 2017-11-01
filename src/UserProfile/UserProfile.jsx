import React, {Component} from 'react';
import NavBar from '../NavBar.jsx';
import UserProfile_Header from './UserProfile_Header.jsx';
import UserProfile_Reviews from './UserProfile_Reviews.jsx';

class UserProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      currentUser: {
        id: null,
        first_name: '',
        last_name: '',
        is_host: false,
        is_chef: false
      }
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
          last_name: result.last_name,
          is_host: result.is_host,
          is_chef: result.is_chef
        }
      });
    })
    .fail(err => {
      console.error('Failed to get current user', err);
    })
  }

  clearUser = event => {
    this.setState({
      currentUser: {
        id: null,
        first_name: '',
        last_name: '',
        is_host: false,
        is_chef: false
      }
    });
  }

  getUser = () => {
    $.get(`/api${this.props.location.pathname}`)
    .then(user => {
      console.log(user)
      this.setState({ user });
    }).fail(err => {
      console.error("failed to get user", err);
    })
  }

  componentDidMount(){
    this.getCurrentUser();
    this.getUser();
  }

  render() {
    console.log('hello');
    return (
      <div className="wrapper">
        <NavBar getCurrentUser={this.getCurrentUser} clearUser={this.clearUser} currentUser={this.state.currentUser}/>
        <UserProfile_Header user={this.state.user}/>
        <UserProfile_Reviews />
      </div>  
    );
  }
}

export default UserProfile;