import React, {Component} from 'react';

class UserProfile_Header extends Component {

  // uploadFile = event => {
  //   event.preventDefault();
  //   const data = new FormData();
  //   const imagedata = document.querySelector('input[type="file"]').files[0];
  //   console.log(imagedata);
  //   data.append('avatar', imagedata);
  //   console.log(data);
  //   fetch('/api/users/upload', {
  //     method: 'post',
  //     credentials: 'include',
  //     body: data
  //   }).then(res => {
  //     if (res.ok) {
  //       alert("Worked");
  //     } else {
  //       alert("error");
  //     }
  //   })
  // }

  render() {
    return (
      <div className="container-fluid">
        <div className="userProfileHeader row">
          <div className="col-4">
            <div className="avatar">
              <img src={this.props.user.avatar} alt="user-avatar"/>  
            </div>
          </div>
          <div className="col-8">
            <div className="userInfo">
              <h4><strong>{this.props.user.fisrt_name} {this.props.user.last_name}</strong></h4>
              <p><strong>Bio: </strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sapiente animi maiores dolorem vitae corrupti magnam quidem hic eos, illo iure maxime. Odio aspernatur autem quod impedit eaque explicabo dolorum!</p>
              <p><strong>Rating: </strong>11/10</p>
            </div>
          </div>
        </div>
        {/* <form onSubmit={this.uploadFile} encType='multipart/form-data'>
          <input type="file" name='avatar'></input>
          <input type="submit" value="upload"></input>
        </form> */}
      </div>  
    );
  }
}

export default UserProfile_Header;