import React, {Component} from 'react';
const uuid = require('uuid/v4');


export default class EventPage_Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: "",
      rating: 0,
      currentUserId: null
    }
  }

  componentDidMount(){

    this.getCurrentUser();

  }

  getCurrentUser = () => {
    $.get("/api/users/current")
    .done(result => {
      this.setState({
        currentUserId: result.id
      });
    })
    .fail(err => {
      console.log('Failed to Logout', err);
    })
  }

  handleReview = (e) => {
    e.preventDefault();

    this.setState({
      review: "",
      rating: 0
    });

    const { review, rating, currentUserId } = this.state;
    this.props.submitReview(review, rating, currentUserId);


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
          </ul><br/>
        </div>
        <form className="col-8 reviewInputWrap" onSubmit={this.handleReview}>
          <textarea className="form-control" id="exampleTextarea" rows="3" placeholder="Type here..." onChange={this.onReviewChange} value={this.state.review}></textarea><br/>
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
          <button className="btn btn-primary clickable" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

