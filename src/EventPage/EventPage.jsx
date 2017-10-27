import React, {Component} from 'react';
import NavBar from '../NavBar.jsx';
import EventPage_Banner from './EventPage_Banner.jsx';
import EventPage_Menu from './EventPage_Menu.jsx';
import EventPage_Review from './EventPage_Review.jsx';

import moment from 'moment';




export default class EventPage extends Component {

  state = {
    event: null,
    reviews: []
  }

  get eventId() {
    return this.props.match.params.id;
  }

  get eventDate() {
    if(this.state.event && this.state.event.event_date) {
      return moment(this.state.event.event_date).format('MMMM Do YYYY, h:mm a');
    }
    return "Unknown date";
  }

  getReviews() {
    $.get(`/api/events/${this.eventId}/reviews`)
      .then(reviews => this.setState({ reviews }))
  }

  getEvent() {
    $.get(`/api/events/${this.eventId}`)
      .then(([event]) => {
        this.setState({ event })
      });
  }
  
  componentDidMount() {
    this.getEvent();
    this.getReviews();
  }

  submitReview = (description, rating) => {
    const review = {
      reviewerId:   20000,
      user_id: 10000,
      rating,
      description
    };

    $.post(`/api/events/${this.eventId}/reviews`, review)
      .then(() => {
        this.getReviews()
      });
  }

  render() {
    const { event, reviews } = this.state;
    
    if(!event) { return null; }

    return (
      <div>
        <NavBar />
        <EventPage_Banner 
          title={event.title}
          price={event.price}
          capacity={event.capacity}
          date={this.eventDate}
          description={event.description}
         />   
        <EventPage_Menu 
          menu={event.menu_description}
        />
        <EventPage_Review
          reviews={reviews}
          submitReview={this.submitReview}
        />
      </div>
     
    );
  }
}