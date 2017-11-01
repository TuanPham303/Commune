import React, {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';

class UserProfile_Header extends Component {

  constructor(props){
    super(props);
    this.state= {
      inputBio: ''
    }
  }

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

  handleSubmit = event => {
    const bioData = {
      bio: this.state.inputBio
    }
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: `/api/users/${this.props.user.id}/bio`,
      data: bioData
    })
    .done(response => {
      console.log(response);
      this.props.getUser();
    })
    .fail(err => {
      console.log('Failed to Login', err);
    })
  }

  handleChange = event => {
    this.setState({
      inputBio: event.target.value
    })
  }
  userBio = () => {
    if (!this.props.user.bio && this.props.currentUser.id === this.props.user.id) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='bio'>Bio</label>
            <textarea className='form-control' name='bio' value={this.state.inputBio} onChange={this.handleChange}></textarea>
          </div>
          <input type="submit" className='btn btn-outline-dark'value='Submit'></input>
        </form>
      )
    } else if (!this.props.user.bio && this.props.currentUser.id !== this.props.user.id) {
      return (
        <div>
          <h5>Bio</h5>
          <p>This User has not created a bio yet.</p>
        </div>
      )
    }
    if (this.props.user.bio) {
      return (
        <div>
          <h5>Bio</h5>
          <p>{this.props.user.bio}</p>
        </div>
      )
    }

  };


  render() {


    return (
      <div className="container-fluid user-profile-header">
        <div className="userProfileHeader row">
          <div className="col-4">
            <div className="avatar">
              <img src={this.props.user.avatar} alt="user-avatar"/>
            </div>
          </div>
          <div className="col-6">
            <div className="userInfo">
              <h4><strong>{this.props.user.first_name} {this.props.user.last_name}</strong></h4>
              {this.userBio()}
              <p><strong>Rating: </strong></p>
              <StarRatingComponent
                name='displayRating'
                editing={false}
                starCount={5}
                renderStarIconHalf={() => <span style={{'color': '#ffb400'}}>½</span>}
                value={Number(this.props.rating)}
                emptyStarColor={'rgba(255, 255, 255, 0)'}
                className="rating"
              />
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