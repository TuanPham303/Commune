import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

class NavBar_PreviewEvent extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Link to={`/events/${this.props.event_id}`}>
          <div key={this.props.event_id} className="dropdown-item searchItem" type="button" data-event-id={this.props.event_id}>
            <b> {this.props.title} </b>
            <div> {this.props.neighbourhood} </div>
          </div>
        </Link>
        <div className="dropdown-divider navsearch-divider"></div>
      </div>
    )
  };
}

export default NavBar_PreviewEvent;