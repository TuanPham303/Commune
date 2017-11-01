import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import EventPage_Map from './EventPage_Map.jsx';

class EventPage_Banner extends Component {
  constructor(props){
    super(props);
  }

  onToken = token  => {
    fetch('/api/payment/save-stripe-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({token: token, amount: this.props.price}),
    }).then(response => {
      if (response.status === 200) {
        return fetch(`/api/events/${this.props.id}/book`, {
          credentials: 'include',
          method: 'POST'
        }).then(() => {
         this.props.getGuestList(this.props.id);
        })
      } else { return alert('Booking failed')}
    });
  }

  carousel(){
    // $('#recipeCarousel').carousel({
    //   interval: 10000
    // })

    $('.carousel-top .carousel-item-top').each(function(){
      var next = $(this).next();
      if (!next.length) {
      next = $(this).siblings(':first');
      }
      if ($('.carousel-top .carousel-item-top').length === 1){
        next = $(this);
        next.children(':first-child').clone().appendTo($(this));
      }
      next.children(':first-child').clone().appendTo($(this));

      if (next.next().length>0) {
      next.next().children(':first-child').clone().appendTo($(this));
      }
      else {
        $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
      }
    });
  }

  componentDidMount(){
    this.carousel();
  }

  render() {
    let paidUser = false;
    this.props.guestList.forEach(guest => {
      if (guest.id === this.props.currentUser.id) {
        paidUser = true;
      }
    })
    let googleMap;
    if (this.props.googleMapKey) {
      googleMap = (
        <EventPage_Map
          location={this.props.location}
          googleMapKey={this.props.googleMapKey}
        />
      )
    };
    const imageCarousel = this.props.images.map((image, i) => {
      return (
        <div className={ i === 0 ? "carousel-item active image-container" : "carousel-item image-container"}>
          <img className="d-block mx-auto w-75 image-caroursel-item" src={image.image} alt={`Image for Event #${this.props.id}`}></img>
        </div>
      )
    })


    const hostCarousel = this.props.hosts_and_chefs.map((host, i) => {
      return (
        <div key={`${host.user_id}_${host.role_name}`} className={ i === 0 ? "carousel-item active" : "carousel-item"}>
          <div className="hostDetail">
            <img className="d-block img-fluid" src={host.avatar}></img>
            <h4 className="text-center">{host.first_name} {host.last_name}</h4>
            <p className="text-center">{host.role_name[0].toUpperCase() + host.role_name.slice(1)}</p>
          </div>
        </div>
      )
    });

    let carouselImageControls;
    if (this.props.images.length > 1) {
      carouselImageControls = (
        <span>
          <a className="carousel-control-prev" href="#carouselImageControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselImageControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </span>
      )
    };

    let carouselControls;
    if (this.props.hosts_and_chefs.length > 1) {
      carouselControls = (
        <span>
          <a className="carousel-control-prev" href="#carouselHostControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselHostControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </span>
      )
    };

    return (
      <div className="eventBanner">
        <div id="carouselImageControls" className="carousel slide image-carousel" data-ride="carousel">
          <div className="carousel-inner" role='listbox'>
            {imageCarousel}
          </div>
            {carouselImageControls}
        </div>

        <div className="eventDetail container-fluid">
          <div className="eventTitle">
            <h3>{this.props.title}</h3>
          </div>
          <div className="row">
            <div className="hostImages col-3">
              <div id="carouselHostControls" className="carousel slide imagesSlider" data-ride="carousel">
                <div className="carousel-inner" role="listbox">
                  { hostCarousel }
                </div>
                  { carouselControls }
              </div>
            </div>
            <div className="col-4">
              <div className="eventInfo">
                <p><i className="fa fa-usd" aria-hidden="true"></i> {this.props.price}</p>
                <p><i className="fa fa-calendar" aria-hidden="true"></i> {this.props.date}</p>
                <p><i className="fa fa-users" aria-hidden="true"></i> {this.props.capacity}</p>
                <p><i className="fa fa-info" aria-hidden="true"></i> {this.props.description}</p>
                { this.props.stripePKey && !paidUser &&
                  <StripeCheckout token={this.onToken}
                  stripeKey={this.props.stripePKey}
                  image="https://yt3.ggpht.com/-MlnvEdpKY2w/AAAAAAAAAAI/AAAAAAAAAAA/tOyTWDyUvgQ/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
                  name={this.props.title}
                  amount={this.props.price * 100}
                  currency="CAD"
                  locale="auto"
                  bitcoin
                  />
                }
                { paidUser &&
                  <p><i className="fa fa-map-marker" aria-hidden="true"></i> {this.props.address}</p>
                }
              </div>
            </div>
            <div className="col-5 eventMap">
              { googleMap }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventPage_Banner;