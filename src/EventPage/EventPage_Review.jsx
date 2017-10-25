import React, {Component} from 'react';
const uuid = require('uuid/v4');


class EventPage_Review extends Component {
  constructor(props){
    super(props);
  }
  
  submitReview = (e) => {
    e.preventDefault();
    const reviewContent = $(e.target).parent().find("textarea").val();
    $.post(`api/events/${this.props.eventId}/reviews`,
      {
        reviewerId: 10000,
        user_id: 10000,
        rating: 3,
        description: reviewContent
      }
    )
  }
  
  render() {
    const reviews = this.props.reviews.map( review => {
      return <p key={uuid()}><strong>{review.first_name} {review.last_name}: </strong>{review.description}</p>
    })

    return (
      <div className="container-fluid row justify-content-center reviewContainer">
        <div className="reviews col-8">
          <h3>Reviews:</h3>
          { reviews }
        </div>
        <form action="" className="col-8">
          <textarea className="form-control" id="exampleTextarea" rows="3"></textarea><br/>
          <button className="btn btn-primary" onClick={this.submitReview}>Submit</button>
        </form>
      </div>
    );
  }
}

export default EventPage_Review;