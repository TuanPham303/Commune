import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import NavBar_PreviewEvent from "./NavBar_PreviewEvent.jsx";
const uuid = require('uuid/v4');

class NavBar_Events extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const navbarEvents = this.props.navbarEvents.map( navbarEvent => {
      console.log(navbarEvent);
      return <NavBar_PreviewEvent
          key= { uuid() }
          title= { navbarEvent.title }
          neighbourhood= { navbarEvent.neighbourhood }
          event_id= { navbarEvent.event_id }
          user_id= { navbarEvent.user_id }
          price= { navbarEvent.price }
          capacity= { navbarEvent.capacity }
          date= { navbarEvent.date }
          description= { navbarEvent.description }
          menu= { navbarEvent.menu_description }
          first_name={navbarEvent.first_name}
          last_name={navbarEvent.last_name} />
    });
    navbarEvents.length = 8; 
    return(
        <div>
          { navbarEvents }
        </div>
    );
  }
}

export default NavBar_Events;