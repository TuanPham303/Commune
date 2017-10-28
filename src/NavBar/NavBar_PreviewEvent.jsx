import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'

class NavBar_PreviewEvent extends Component {
  constructor(props){
    super(props);
  }

// handleClick = event => {
//   console.log("clickID: ", this.props.event_id)
//   this.props.createEventDetail(this.props.event_id);
// }

  render() {
    return (
      <div>
        <Link to={`/events/${this.props.event_id}`} >
          <div className="dropdown-item searchItem" type="button" onClick={ this.props.handleClick } id={this.props.event_id}>
            <b> {this.props.title} </b>
            {this.props.neighbourhood}
          </div>
        </Link>
        <div className="dropdown-divider"></div>
      </div>
    )
  };
}

export default NavBar_PreviewEvent;