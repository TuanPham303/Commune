import React, {Component} from 'react';
import NavBar from '../NavBar.jsx';
import EventPage_Banner from './EventPage_Banner.jsx';
import EventPage_Menu from './EventPage_Menu.jsx';
import EventPage_Review from './EventPage_Review.jsx';
import EventPage_GuestList from './EventPage_GuestList.jsx';
import Login from '../Login.jsx';
import Register from '../Register.jsx';
import NewEventForm from '../NewEventForm.jsx';
import BecomeHost from '../BecomeHost.jsx';
import EditEventForm from './EditEventForm.jsx';

import moment from 'moment';

export default class EventPage extends Component {

  state = {
    event: undefined,
    reviews: [],
    images: [],
    currentUser: {
      id: null,
      first_name: '',
      last_name: '',
      is_host: false,
      is_chef: false
    },
    guestList: [],
    stripePKey: '',
    googleMapKey: ''
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
      this.getEvent(nextProps.match.params.id);
      this.getReviews(nextProps.match.params.id);
      this.getGuestList(nextProps.match.params.id);
    }
  }

  getReviews = (eventId = this.eventId) => {
    $.get(`/api/events/${eventId}/reviews`)
      .then(reviews => this.setState({ reviews }))
  }

  getEvent = (id) => {
    $.get(`/api/events/${id || this.eventId}`)
      .then(([event]) => {
        this.setState({ event })
      });
  }

  getCurrentUser = () => {
    $.ajax({
      method: "GET",
      url: "/api/users/current"
    })
    .done(result => {
      if (result !== 'no current user') {
        this.setState({
          currentUser: {
            id: result.id,
            first_name: result.first_name,
            last_name: result.last_name,
            is_host: result.is_host,
            is_chef: result.is_chef
          }
        });
      }
    })
    .fail(err => {
      console.error('Failed to get current user', err);
    })
  }

  carousel(){
    $('#recipeCarousel').carousel({
      interval: 10000
    })

    $('.carousel-top .carousel-item-top').each(function(){
      let next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      if ($('.carousel-top .carousel-item-top').length === 1){
        next = $(this);
        next.children(':first-child').clone().appendTo($(this));
      }
      next.children(':first-child').clone().appendTo($(this));
      if (next.next().length > 0) {
        next.next().children(':first-child').clone().appendTo($(this));
      }
      else {
        $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
      }
    });
  }

  getEventImages = (id = this.eventId) => {
    $.get(`/api/events/${id}/images`)
    .then(images => {

      if (images) {
        this.setState({ images  })
      }
      if (images.length === 0)  {
        this.setState({
          images: this.state.images.concat([{image: '/event-images/event_default.jpg'}])
        })
      }
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
    if (rating !== 0) {
      const review = {
        reviewer_id: currentUserId,
        user_id: currentUserId,
        rating,
        description
      };

      $.post(`/api/events/${this.eventId}/reviews`, review)
        .then((res) => {
          this.getReviews()
          if (res === "Created") {
            $('.hidden').removeClass('hidden').fadeOut(4000);
          }
        });
    }
  }

  getGuestList = (id) => {
    $.get(`/api/events/${id}/guestlist`)
    .then( guestList => {
      this.setState({
        guestList
      })
    })
  }

  publickeys = () => {
    $.get("/api/events/publickeys")
    .done(keys => {
      this.setState({
        stripePKey: keys.stripePKey,
        googleMapKey: keys.googleMapKey
      });
    })
  }

  componentDidMount() {
    this.getEvent();
    this.getReviews();
    this.getCurrentUser();
    this.getGuestList(this.eventId);
    this.publickeys();
    this.getEventImages();
  }

  render() {
    const { event, reviews, guestList, images } = this.state;
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
          id={event.event_id}
          title={event.title}
          price={event.price}
          address={event.address}
          capacity={event.capacity}
          date={this.eventDate}
          description={event.description}
          image={event.image_url}
          hosts_and_chefs={event.hosts_and_chefs}
          location={event.location}
          getGuestList={this.getGuestList}
          stripePKey={this.state.stripePKey}
          googleMapKey={this.state.googleMapKey}
          guestList={this.state.guestList}
          currentUser={this.state.currentUser}
          eventId={this.eventId}
          images={images}
          carousel={this.carousel}
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
          currentUserId={this.state.currentUser.id}
          currentUser={this.state.currentUser}
          guestList={guestList}
        />
        <Login getCurrentUser={this.getCurrentUser} />
        <Register getCurrentUser={this.getCurrentUser} />
        <NewEventForm currentUser={this.state.currentUser} />
        <BecomeHost getCurrentUser={this.getCurrentUser} />
        <EditEventForm
          event={this.state.event}
          currentUser={this.state.currentUser}
        />
      </div>
    );
  }
}