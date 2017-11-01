import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class UserProfile_Events extends Component {

 

  render() {

    const events = this.props.events.map(event => {
      return (
        <Link to={`/events/${event.event_id}`}className='row mb-2 hosted-event' style={{ textDecoration: 'none'}}>
          <div className='col-md-4 offset-md-3'>
            <h5>{event.title}</h5>
            <p>{event.description}</p>
            <small>{event.event_date}</small>
          </div>
          <div className='col-sm-1'>
            <p>{event.review_count}</p>
          </div>
          <div className='col-md-2'>
            <p>{event.review_avg}</p>
          </div>
        </Link>
      )
    })

    return (
      <div className="container">
        <h3>Hosted Events</h3>
        <div className='row hotsted-event-header'>
          <h5 className='col-md-4 offset-md-3'>Event</h5>
          <h5 className='col-sm-1'>Reviews</h5>
          <h5 className='col-sm-2'>Rating</h5>
        </div>
        {events}
      </div>  
    );
  }
}

export default UserProfile_Events;