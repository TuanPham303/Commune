import React, {Component} from 'react';
import NavBar from '../NavBar.jsx';
import UserProfile_Header from './UserProfile_Header.jsx';
import UserProfile_Reviews from './UserProfile_Reviews.jsx';

class UserProfile extends Component {
  render() {
    return (
      <div className="wrapper">
        <NavBar />
        <UserProfile_Header />
        <UserProfile_Reviews />
      </div>  
    );
  }
}

export default UserProfile;