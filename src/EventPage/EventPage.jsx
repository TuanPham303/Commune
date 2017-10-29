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

  state = {
    event: null,
    reviews: [],
    currentUser: {
      id: null,
      first_name: '',
      last_name: '',
      is_host: false,
      is_chef: false
    },
    guestList: []
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

  // createEventDetail = (id) => {
  //   const eventId = id || this.props.match.params.id;
  //   $.ajax({
  //     method: "GET",
  //     url: `/api/events/${eventId}`,
  //     success: data => {
  //       console.log('data', data);
  //       this.setState({
  //         eventDetail: {
  //           title: data[0].title,
  //           price: data[0].price,
  //           capacity: data[0].capacity,
  //           date: moment(data[0].event_date).format('MMMM Do YYYY, h:mm a'),
  //           description: data[0].description,
  //           menu: data[0].menu_description,
  //         }
  //       })
  //     }
  //   })
  // }

  componentDidMount(){
    this.getEvent();
    this.getReviews();
    this.getCurrentUser();
    this.getGuestList();
  }

  getEvent(id) {
    $.get(`/api/events/${id ? id : this.eventId}`)
      .then(([event]) => {
        console.log("this is a test for [event]:", [event])
        this.setState({ event })
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

  getGuestList = () => {
    $.get(`/api/events/${this.eventId}/guestlist`)
    .then( guestList => {
      this.setState({
        guestList
      })
    })
  }

  render() {
    const { event, reviews, guestList } = this.state;
    if(!event) { return null; }

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
          id ={event.event_id}
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