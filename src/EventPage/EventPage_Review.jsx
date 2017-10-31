import React, {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';
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
    this.props.submitReview(review, rating, this.props.currentUserId);


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
            <h4>Describe your experience:</h4>
            <textarea className="form-control" id="exampleTextarea" rows="3" placeholder="Type here..." onChange={this.onReviewChange} value={this.state.review}></textarea>
            <div style={{'fontSize': '180%'}}>
              <h5>Rate the meal:&nbsp; 
                <StarRatingComponent
                  name="rating"
                  starCount={5}
                  value={rating}
                  onStarClick={this.onStarClick.bind(this)}
                />
              </h5> 
            </div>
            <button className="btn btn-primary clickable" type="submit">Submit</button>
          </form>
        }
      </div>
    );
  }
}

