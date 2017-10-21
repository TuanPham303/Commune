import React, {Component} from 'react';
import NavBar from '../NavBar.jsx';
import EventPage_Banner from './EventPage_Banner.jsx';
import EventPage_Menu from './EventPage_Menu.jsx';
import EventPage_Review from './EventPage_Review.jsx';


class EventPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <EventPage_Banner />   
        <EventPage_Menu />
        <EventPage_Review />
      </div>
     
    );
  }
}

export default EventPage;