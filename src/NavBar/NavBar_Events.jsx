import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import NavBar_PreviewEvent from "./NavBar_PreviewEvent.jsx";

class NavBar_Events extends Component {
  constructor(props){
    super(props);
  }

  navbarEvents = () => {
    if (navbarEvents === undefined) { return; }
    this.props.navbarEvents.map( navbarEvent => {
      return <NavBar_PreviewEvent 
        title={navbarEvent.title}
        neighbourhood={navbarEvent.neighbourhood}
        event_id={navbarEvent.event_id}
      />
    });
  }

  render() {
    console.log('all events', this.props.navbarEvents);
    return(
      <div>
         { this.navbarEvents }
      </div>
    );
  }
}

export default NavBar_Events;