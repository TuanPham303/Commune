import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import StarRatingComponent from 'react-star-rating-component';

class UserProfile_Events extends Component {

  eventRating = (event) => {
    if (isNaN(event.review_avg)) {
      return 'N/A'
    } else {
      return (
        <StarRatingComponent
          name='displayRating'
          editing={false}
          starCount={5}
          renderStarIconHalf={() => <span style={{'color': '#ffb400'}}>½</span>}
          value={Number(event.review_avg)}
          emptyStarColor={'rgba(255, 255, 255, 0)'}
          className="rating"
        />
      )
    }
  }


  render() {

    const events = this.props.events.map(event => {
      if(event.description && event.description.length > 100){
        event.description = event.description.substring(0, 100) + '...'
      }
      const convertedEventDate = moment(event.event_date).format('MMMM Do YYYY');
      return (
        <Link key={event.event_id} to={`/events/${event.event_id}`} className='row mb-2 hosted-event invisilink' >
          <div className='col-md-4 offset-md-3' style={{'borderBottom': '1px solid #000'}}>
            <h5>{event.title}</h5>
            <p className="description-p">{event.description}</p>
            <small>{convertedEventDate}</small>
          </div>
          <div className='col-sm-1'>
            <p>{event.review_count}</p>
          </div>
          <div className='col-md-2'>
            { this.eventRating(event) }
          </div>
        </Link>
      )
    })

    return (
      <div className="container hostedEvents">
        <h3 className="text-center">Hosted Events</h3>
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