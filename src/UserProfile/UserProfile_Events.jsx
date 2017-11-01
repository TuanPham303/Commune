import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

class UserProfile_Events extends Component {

  


  render() {

    const events = this.props.events.map(event => {
      if(event.description && event.description.length > 100){
        event.description = event.description.substring(0, 100) + '...'
      }
      const convertedEventDate = moment(event.event_date).format('MMMM Do YYYY');
      return (
        <Link to={`/events/${event.event_id}`}className='row mb-2 hosted-event' style={{ textDecoration: 'none'}}>
          <div className='col-md-4 offset-md-3 hosted-events-detail'>
            <h5>{event.title}</h5>
            <p className="description-p">{event.description}</p>
            <small>{convertedEventDate}</small>
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
          <h5 className='col-md-4 offset-md-3 user-events-headers'><i className="fa fa-spoon"></i></h5>
          <h5 className='col-sm-1 user-events-headers'><i className="fa fa-pencil"></i></h5>
          <h5 className='col-sm-2 user-events-headers'><i className="fa fa-star"></i></h5>
        </div>
        {events}
      </div>  
    );
  }
}

export default UserProfile_Events;