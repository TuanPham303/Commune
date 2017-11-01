import React, {Component} from 'react';
import NavBar from '../NavBar.jsx';
import UserProfile_Header from './UserProfile_Header.jsx';
import UserProfile_Reviews from './UserProfile_Reviews.jsx';
import UserProfile_Events from './UserProfile_Events.jsx';

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
      },
      events: []
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
        is_chef: false,
        rating: ''
      }
    });
  }

  getUser = () => {
    $.get(`/api${this.props.location.pathname}`)
    .then(user => {
   
      this.setState({ user });
    }).fail(err => {
      console.error("failed to get user", err);
    })
  }
  
  getHostedEvents = () => {
    fetch(`/api${this.props.location.pathname}/events/hosted`, {
      method: 'GET',
      credentials: 'include',
    })
    .then((res) => {
      res.json()
      .then(events => {
        console.log(events);
        this.setState({ events })
      })
    })
    .catch(err => {
      console.error('Failed to get hosted event ', err);
    })  
  }

  getUserRating = () => {
    fetch(`/api${this.props.location.pathname}/rating`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => {
      res.json()
      .then(rating => {
        if (!rating) {
          this.setState({rating: 'N/A'})
        } else {
         this.setState({rating})
        }
      })
    })
  }

  componentDidMount(){
    this.getCurrentUser();
    this.getUser();
    this.getHostedEvents();
    this.getUserRating();
  }

  render() {
 
    return (
      <div className="wrapper">
        <NavBar getCurrentUser={this.getCurrentUser} clearUser={this.clearUser} currentUser={this.state.currentUser}/>
        <UserProfile_Header user={this.state.user} rating={this.state.rating}/>
        <UserProfile_Events events={this.state.events}/>
        <UserProfile_Reviews />
      </div>  
    );
  }
}

export default UserProfile;