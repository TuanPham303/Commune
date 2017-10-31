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
      let hosts = new Set();
      navbarEvent.hosts_and_chefs.forEach( person => {
        if (person.role_name !== 'host') { return; }
        hosts.add(`${person.first_name} ${person.last_name}`)
      })
      return <NavBar_PreviewEvent
          key= { navbarEvent.event_id }
          title= { navbarEvent.title }
          neighbourhood= { navbarEvent.neighbourhood }
          event_id= { navbarEvent.event_id }
          user_id= { navbarEvent.user_id }
          price= { navbarEvent.price }
          capacity= { navbarEvent.capacity }
          date= { navbarEvent.date }
          description= { navbarEvent.description }
          menu= { navbarEvent.menu_description }
          host={[...hosts].join(', ')} />
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