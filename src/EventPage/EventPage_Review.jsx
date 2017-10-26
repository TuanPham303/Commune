import React, {Component} from 'react';
const uuid = require('uuid/v4');


export default class EventPage_Review extends Component {

  state = {
    review: "",
    rating: 0.0
  }
  
  handleReview = (e) => {
    e.preventDefault();

    const { review, rating } = this.state;
    this.props.submitReview(review, rating);

    this.setState({
      review: "",
      rating: 0
    });
  }

  onReviewChange = (e) => {
    this.setState({ review: e.target.value });
  }

  onRatingChange = (e) => {
    this.setState({ rating: e.target.value });
  }
  
  render() {
    const reviews = this.props.reviews.map(review => (
      <li className="list-group-item" key={uuid()}>
        <strong>{review.first_name} {review.last_name}: </strong>{review.description} ({review.rating}/5)
      </li>
    ));

    return (
      <div className="container-fluid row justify-content-center reviewContainer">
        <div className="col-8 reviewsWrap">
          <h3>Reviews:</h3>
          <ul className="list-group reviews">
            { reviews }
          </ul>
        </div>
        <form className="col-8 reviewInputWrap" onSubmit={this.handleReview}>
          <textarea className="form-control" id="exampleTextarea" rows="3" onChange={this.onReviewChange} value={this.state.review}></textarea><br/>
          <div className="input-group ratingWrap">
            <label htmlFor="exampleSelect1" className="input-group-addon">Rate the meal</label>
            <select className="form-control rating" onChange={this.onRatingChange} value={this.state.rating}>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div><br/>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

