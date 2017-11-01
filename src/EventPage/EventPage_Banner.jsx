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
    $('#recipeCarousel').carousel({
      interval: 10000
    })

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
  get isHost(){
    if (this.props.guestList.length > 0 && this.props.currentUser){
      return this.props.guestList[0].id === this.props.currentUser.id
    }
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

    let carouselControls;
    if (this.props.hosts_and_chefs.length > 1) {
      carouselControls = (
        <span>
          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </span>
      )
    };
    
    return (
      <div className="eventBanner container-fluid">
        <div className="row mx-auto my-auto">
          <div id="recipeCarousel" className="carousel slide w-100 carousel-top" data-ride="carousel">
            <div className="carousel-inner" role="listbox">
              <div className="carousel-item carousel-item-top active">
                <img className="col-4 img-fluid" src="http://placehold.it/350x180?text=1" />
              </div>
              <div className="carousel-item carousel-item-top">
                <img className="col-4 img-fluid" src="http://placehold.it/350x180?text=2" />
              </div>
              <div className="carousel-item carousel-item-top">
                <img className="col-4 img-fluid" src="http://placehold.it/350x180?text=3" />
              </div>
              <div className="carousel-item carousel-item-top">
                <img className="col-4 img-fluid" src="http://placehold.it/350x180?text=4" />
              </div>
              <div className="carousel-item carousel-item-top">
                <img className="col-4 img-fluid" src="http://placehold.it/350x180?text=5" />
              </div>
              <div className="carousel-item carousel-item-top">
                <img className="col-4 img-fluid" src="http://placehold.it/350x180?text=6" />
              </div>
            </div>
            <a className="carousel-control-prev" href="#recipeCarousel" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#recipeCarousel" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>

        <div className="eventDetail">
          <div className="eventTitle">
            <h3>{this.props.title}</h3>
          </div>
          <div className="row">
            <div className="hostImages col-3">
              <div id="carouselExampleControls" className="carousel slide imagesSlider" data-ride="carousel">
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
                <p><i className="fa fa-info-circle" aria-hidden="true"></i> {this.props.description}</p>
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
                { this.isHost &&
                  <button className="btn btn-primary" data-toggle="modal" data-target="#editEventModal">Edit Event</button>
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