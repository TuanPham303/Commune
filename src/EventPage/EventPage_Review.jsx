import React, {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';
import {Link} from 'react-router-dom';
const uuid = require('uuid/v4');


export default class EventPage_Review extends Component {
  constructor(props) {
    super(props);

 
    this.state = {
      review: "",
      rating: 0,
      currentUserId: null,
      emptyReviewOrRating: false,
      selectedUserId: ''
    }
  }

  componentDidMount(){
    this.setState({
      currentUserId: this.props.currentUserId
    })
    setTimeout(() => {
      this.setState({ selectedUserId: this.props.guestList[0].id})
    }, 500);
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

    const { review, rating, currentUserId, selectedUserId } = this.state;
    this.props.submitReview(review, rating, currentUserId, selectedUserId );

    this.setState({
      review: "",
      rating: 0,
      selectedUserId: ''
    });

    if(this.state.review === '' || this.state.rating === 0){
      this.state.emptyReviewOrRating = true;
    } else {
      this.state.emptyReviewOrRating = false;
      this.props.submitReview(review, rating, this.props.currentUserId);
    }

  }
  handleSelect = e => {
    for (let node of e.target.children) {
      if (node.value === e.target.value) {
        this.setState({ selectedUserId: node.getAttribute('data-id')});
        return;
      }
    }
  }

  onReviewChange = (e) => {
    this.setState({ review: e.target.value });
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  render() {
    const { rating } = this.state;

    const reviews = this.props.reviews.map(review => (
      <li className="list-group-item" key={uuid()}>
        <StarRatingComponent
          name='displayRating'
          editing={false}
          starCount={5}
          value={Number(review.rating)}
          className="rating"
        />
        &nbsp;&nbsp;
        <Link to={`/users/${review.id}`} className="invisilink">
          <strong>
            {review.first_name} {review.last_name}:
          </strong>
        </Link>
        &nbsp;
        {review.description}
      </li>
    ));

    let paidUser = false;
    this.props.guestList.forEach(guest => {
      if (guest.id === this.props.currentUser.id) {
        paidUser = true;
      }
    })

    const reviewUser = this.props.guestList.map(guest => {
      return (
      <option key={guest.id} data-id={guest.id}>
        {guest.role_name[0].toUpperCase()}{guest.role_name.slice(1)} - {guest.first_name} {guest.last_name}
      </option>
      )
    })

    return (
      <div className="container-fluid justify-content-center reviewContainer">
        <div className="row justify-content-center">
          <div className="triangleTop"></div>
          <div className="col-8 reviewsWrap">
            <h3>Reviews:</h3>
            <ul className="list-group reviews">
              { reviews }
            </ul><br/>
          </div>
          <br/><br/>
          { paidUser &&
            <form className="col-8 reviewInputWrap" onSubmit={this.handleReview}>
              <div className='form-group'>
                <div className='hidden'>
                  <span className='post-review'>Thank you for submitting a review</span>
                </div>
              </div>
              <h4>Leave a review:</h4>
              <div className="input-group ratingWrap mb-2">
                <label htmlFor="exampleSelect1" className="input-group-addon">Select host/guest to review</label>
                <select onChange={this.handleSelect} className="form-control rating" >
                  { reviewUser }
                </select>
              </div>
              <div className='form-group'>
                <textarea className="form-control" id="exampleTextarea" rows="3" placeholder="Describe your experience..." onChange={this.onReviewChange} value={this.state.review}></textarea>
              </div>
              <div className='form-group' style={{'fontSize': '180%'}}>
                <h5>Rating:&nbsp;
                  <StarRatingComponent
                    name="rating"
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                  />
                </h5>
              </div>
              <button className="btn btn-primary clickable" type="submit">Submit</button>
              { this.state.emptyReviewOrRating &&
                <p style={{'color':'red'}}>Review and rating fields required</p>
              }
            </form>
          }
        </div>
      </div>
    );
  }
}

