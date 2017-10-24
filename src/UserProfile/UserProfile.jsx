import React, {Component} from 'react';
import NavBar from '../NavBar.jsx';
import UserProfile_Header from './UserProfile_Header.jsx';
import UserProfile_Reviews from './UserProfile_Reviews.jsx';

class UserProfile extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {

  //   }
  // }

  // componentDidMount(){
  //   const userDetail = () => {
  //     $.ajax({
  //       method: "GET",
  //       url: "/api/users",
  //       success: data => {
  //         console.log(data);
  //         // this.setState({
  //         //   previewEvents: this.state.previewEvents.concat(data)
  //         // })
  //       }
  //     })
  //   }
  //   userDetail();
  // }

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