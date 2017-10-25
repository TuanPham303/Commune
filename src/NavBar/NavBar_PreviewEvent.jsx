import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

class NavBar_PreviewEvent extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <button class="dropdown-item" type="button">
          <p><b>Event Title:</b> {this.props.title} </p>
          <p><b>Event Description:</b> {this.props.neighbourhood} </p>
        </button>
      </div>
    )
  };
}

export default NavBar_PreviewEvent;