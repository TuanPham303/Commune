import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

class HomePage_PreviewEvent extends Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props.event_id)
    return (
      <div className="col-4 event">
        <div className="imgContainer">
          <img src={this.props.image_url} className='eventImg'/>
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
            <div className="col-5 buttonWrap">
              <Link to={`/events/${this.props.event_id}`}>
                <button className="btn btn-success" data-event-id={this.props.event_id} onClick={this.handleEventDetail}>Detail</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  };
}

export default HomePage_PreviewEvent;