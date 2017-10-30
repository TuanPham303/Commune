import React, {Component} from 'react';
import NavBar from '../NavBar.jsx';
import EventPage_Banner from './EventPage_Banner.jsx';
import EventPage_Menu from './EventPage_Menu.jsx';
import EventPage_Review from './EventPage_Review.jsx';
import EventPage_GuestList from './EventPage_GuestList.jsx';
import Login from '../Login.jsx';
import Register from '../Register.jsx';

import moment from 'moment';

export default class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      reviews: [],
      currentUser: {
        id: null,
        first_name: '',
        last_name: '',
        is_host: false,
        is_chef: false
      },
      guestList: [],
    }
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

  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.id !== this.props.match.params.id) {
      // console.log("here is getGuest: ", this.getEvent(this.props.match.params.id));
      this.getEvent(nextProps.match.params.id)
      this.getReviews(nextProps.match.params.id);
      this.getGuestList(nextProps.match.params.id);
    }
  }

  getReviews(eventId = this.eventId) {
    $.get(`/api/events/${eventId}/reviews`)
      .then(reviews => this.setState({ reviews }))
  }

  componentDidMount(){
    this.getEvent(this.eventId);
    this.getReviews(this.eventId);
    this.getCurrentUser();
    this.getGuestList(this.eventId);
  }

  getEvent(id) {
    this.setState({loadingEvent: true});
    $.get(`/api/events/${id || this.eventId}`)
      .then(([event]) => {
        this.setState({ event, loadingEvent: undefined })
      });
  }

  getCurrentUser = () => {
    $.ajax({
      method: "GET",
      url: "/api/users/current"
    })
    .done(result => {
      this.setState({
        currentUser: {
          id: result.id,
          first_name: result.first_name,
          last_name: result.last_name,
          is_host: result.is_host,
          is_chef: result.is_chef
        }
      });
    })
    .fail(err => {
      console.log('Failed to Logout', err);
    })
  }

  clearUser = event => {
    this.setState({
      currentUser: {
        id: null,
        first_name: '',
        last_name: '',
        is_host: false,
        is_chef: false
      }
    });
  }

  submitReview = (description, rating, currentUserId) => {
    const review = {
      reviewerId: currentUserId,
      user_id: currentUserId,
      rating,
      description
    };

    $.post(`/api/events/${this.eventId}/reviews`, review)
      .then(() => {
        this.getReviews()
      });
  }

  getGuestList(id) {
    $.get(`/api/events/${id}/guestlist`)
    .then( guestList => {
      this.setState({
        guestList
      })
    })
  }

  render() {
    const { event, reviews, guestList } = this.state;
    if(!event) { return null; }
    console.log(guestList);

    return (
      <div className='eventWrapper' id="bootstrap-overrides">
        <NavBar
          currentUser={this.state.currentUser}
          clearUser={this.clearUser}
          getCurrentUser={this.getCurrentUser}
          getSearchResults={this.props.getSearchResults}
          getEvent={this.getEvent}
        />
        <EventPage_Banner
          id={event.event_id}
          title={event.title}
          price={event.price}
          capacity={event.capacity}
          date={this.eventDate}
          description={event.description}
          image={event.image_url}
          hosts_and_chefs={event.hosts_and_chefs}
          location={event.location}
          getGuestList={this.getGuestList}
         />
        <EventPage_Menu
          menu={event.menu_description}
        />
        <EventPage_GuestList
          guestList={guestList}
        />
        <EventPage_Review
          reviews={reviews}
          submitReview={this.submitReview}
        />
        <Login getCurrentUser={this.getCurrentUser} />
        <Register getCurrentUser={this.getCurrentUser} />
      </div>

    );
  }
}