import React, {Component} from 'react';

class UserProfile_Header extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="userProfileHeader row">
          <div className="col-4">
            <div className="avatar">
              <img src="https://media.vanityfair.com/photos/58c2f5aa0a144505fae9e9ee/master/pass/avatar-sequels-delayed.jpg" alt=""/>  
            </div>
          </div>
          <div className="col-8">
            <div className="userInfo">
              <h4><strong>Name: </strong>User</h4>
              <p><strong>Bio: </strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sapiente animi maiores dolorem vitae corrupti magnam quidem hic eos, illo iure maxime. Odio aspernatur autem quod impedit eaque explicabo dolorum!</p>
              <p><strong>Rating: </strong>11/10</p>
            </div>
          </div>
        </div>
      </div>  
    );
  }
}

export default UserProfile_Header;