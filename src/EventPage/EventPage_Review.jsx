import React, {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';
const uuid = require('uuid/v4');


export default class EventPage_Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: "",
      rating: 0,
      currentUserId: null,
      emptyReviewOrRating: false
    }
  }

  componentDidMount(){
    this.setState({
      currentUserId: this.props.currentUserId
    })
  }

  handleReview = (e) => {
    e.preventDefault();

    this.setState({
      review: "",
      rating: 0
    });

    const { review, rating } = this.state;


    if(this.state.review === '' || this.state.rating === 0){
      this.state.emptyReviewOrRating = true;
    } else {
      this.state.emptyReviewOrRating = false;
      this.props.submitReview(review, rating, this.props.currentUserId);
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
        <strong>
          {review.first_name} {review.last_name}:
        </strong>
        &nbsp;
        {review.description}
        &nbsp;
        <StarRatingComponent
          name='displayRating'
          editing={false}
          starCount={5}
          value={Number(review.rating)}
          className="rating"
        />
      </li>
    ));

    let paidUser = false;
    this.props.guestList.forEach(guest => {
      if (guest.id === this.props.currentUser.id) {
        paidUser = true;
      }
    })

    const reviewUser = this.props.guestList.map(guest => {
      return (<option key={guest.id}>
        {guest.role_name} - {guest.first_name} {guest.last_name}
      </option> )
    })

    return (
      <div className="container-fluid row justify-content-center reviewContainer">
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
            <h4>Leave a review:</h4>
            <div className="input-group ratingWrap mb-2">
              <label htmlFor="exampleSelect1" className="input-group-addon">Select host/guest to review</label>
              <select className="form-control rating" >
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
    );
  }
}

