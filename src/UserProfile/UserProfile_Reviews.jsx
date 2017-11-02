import React, {Component} from 'react';
const uuid = require('uuid/v4');

class UserProfile_Reviews extends Component {
  render() {
    const reviews = this.props.reviews.map( review => {
      return <div className="row review" key={uuid()}>
      <div className="col-2">
        <div className="avatar">
          <img className="thumbnail" src={review.avatar} alt=""></img>
        </div>
      </div>
      <div className="content col-10 text-left">
        <div>
          <p><strong>{review.first_name} {review.last_name}</strong>: {review.description}</p>
        </div>
      </div>
      <hr/>
    </div>
    })

    return (
    <span>
      <div className="triangleTop"></div>
      <div className="container-fluid">
        <div className="reviews row justify-content-center menuContainer">
          <div className="col-8">
            <h3>Reviews:</h3>
              { reviews }
          </div>
        </div>
      </div>
    </span>
    );
  }
}

export default UserProfile_Reviews;