import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


class HomePage_PreviewEvent extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="col-4 event">
        <div className="imgContainer">
          <img src={this.props.image_url} className='eventImg'/>
        </div>
        <div className="eventDescription">
          <p className="text-center preview-event-title"><b>{this.props.title}</b></p>
          <div className="row">
            <p className="col-3 text-center"><i className="fa fa-usd" aria-hidden="true"></i> {this.props.price}</p>  
            <p className="col-3 text-center"><i className="fa fa-users" aria-hidden="true"></i> {this.props.capacity} </p>
            <p className="col-6 text-center"><i className="fa fa-map-marker" aria-hidden="true"></i> {this.props.neighbourhood} </p>
          </div>
          <p className="description-p" style={{'paddingLeft':'10px'}}><i className="fa fa-info" aria-hidden="true"></i> {this.props.description} </p>
          <div className="hostAndDetailButton">
            <div className="row">
              <div className="col-7 row">
                <div className="col-5">
                  <div className="avatar">
                    <img src={this.props.hostimage} alt="" className="avatarImg"/>
                  </div>
                </div>
                <div className="col-7 hostDetail">
                  <p>{this.props.host}</p>
                </div>
              </div>
              <div className="col-5 buttonWrap">
                <Link to={`/events/${this.props.event_id}`}>
                  <button className="btn btn-success clickable details-button" data-event-id={this.props.event_id} onClick={this.handleEventDetail}>Details</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
}

export default HomePage_PreviewEvent;