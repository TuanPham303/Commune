import React, {Component} from 'react';


class EventPage_Review extends Component {
  render() {
    return (
      <div className="container-fluid row justify-content-center reviewContainer">
        <div className="reviews col-8">
          <h3>Reviews:</h3>
          <p><strong>Tuan:</strong> Good, don't eat</p>
          <p><strong>Tuna:</strong> Bad, recommended</p>
        </div>
        <form action="" className="col-8">
          <textarea className="form-control" id="exampleTextarea" rows="3"></textarea><br/>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default EventPage_Review;