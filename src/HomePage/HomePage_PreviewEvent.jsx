import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

class HomePage_PreviewEvent extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="col-4 event">
        <div className="imgContainer">
          <div className="imgContainerOpacity"></div>
        </div>
        <div className="eventDescription">
          <p><b>Event Title:</b> {this.props.title}(${this.props.price})</p>
          <p><b>Event Description:</b> {this.props.description} </p>
          <div className="neighbourhoodAndCapacity row">
            <p className="col"><b>Neighbourhood:</b> {this.props.neighbourhood} </p>
            <p className="col"><b>Event Capacity:</b> {this.props.capacity} </p>
          </div>
          <div className="hostAndDetailButton row">
            <div className="col-7 row">
              <div className="avatar col-4">
                <img src="http://akns-images.eonline.com/eol_images/Entire_Site/2017210/rs_300x300-170310083229-600.avatar-1.31017.jpg?downsize=300:*&crop=300:300;left,top" alt="" className="avatarImg"/>
              </div>
              <div className="col-8 hostDetail">
                <p>{this.props.host}</p>
              </div>
            </div>
            <Link to={`/events/${this.props.eventId}`}>
              <div className="col-5">
                <button className="btn btn-success" data-event-id={this.props.eventId} onClick={this.handleEventDetail}>Detail</button>
              </div>
            </Link>
          </div>
        </div>
      </div>  
    )
  };
}

export default HomePage_PreviewEvent;