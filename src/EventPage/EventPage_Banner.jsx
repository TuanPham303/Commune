import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import EventPage_Map from './EventPage_Map.jsx'



class EventPage_Banner extends Component {
  constructor(props){
    super(props);

    this.state = {
      stripePKey: '',
      googleMapKey: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("Next Props from inside the banner:", nextProps)
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
      console.log(response);
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
    this.publickeys();
  }

  render() {
    let googleMap;
    if (this.state.googleMapKey) {
      googleMap = (
        <EventPage_Map
          location={this.props.location}
          googleMapKey={this.state.googleMapKey}
        />
      )
    };

    const hostCarousel = this.props.hosts_and_chefs.map((host, i) => {
      return (
        <div key={host.user_id} className={ i === 0 ? "carousel-item active" : "carousel-item"}>
          <img className="d-block img-fluid" src="https://yt3.ggpht.com/-MlnvEdpKY2w/AAAAAAAAAAI/AAAAAAAAAAA/tOyTWDyUvgQ/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"></img>
          <div className="carousel-caption d-none d-md-block">
            <h3>{host.first_name} {host.last_name}</h3>
            <p>{host.role_name[0].toUpperCase() + host.role_name.slice(1)}</p>
          </div>
        </div>
      )
    })

    return (
      <div className="eventBanner container-fluid">
        <div className="row">
          <div className="image col-4">
            <img src={this.props.image} alt=""/>
          </div>
          <div className="image col-4">
            <img src={this.props.image} alt=""/>
          </div>
          <div className="image col-4">
            <img src={this.props.image} alt=""/>
          </div>
        </div>

        <div className="eventDetail">
          <div className="eventTitle">
            <h3>{this.props.title} (${this.props.price})</h3>
          </div>
          <div className="row">
            <div className="hostImages col-3">
              <div id="carouselExampleControls" className="carousel slide imagesSlider" data-ride="carousel">
                <div className="carousel-inner" role="listbox">
                  { hostCarousel }
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
            <div className="col-4">
              <div className="eventInfo">
                <div className="date">
                  <strong>Date</strong>
                  <p>{this.props.date}</p>
                </div>
                <div className="capacity">
                  <strong>Capacity</strong>
                  <p>{this.props.capacity} people</p>
                </div>
                <div className="description">
                  <strong>Description</strong>
                  <p>{this.props.description}</p>
                </div>
                <StripeCheckout token={this.onToken}
                stripeKey={this.state.stripePKey}
                image="https://yt3.ggpht.com/-MlnvEdpKY2w/AAAAAAAAAAI/AAAAAAAAAAA/tOyTWDyUvgQ/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
                name={this.props.title}
                amount={this.props.price * 100}
                currency="CAD"
                locale="auto"
                bitcoin
                />
              </div>
            </div>
            <div className="col-5">
              { googleMap }
            </div>
          </div>
        </div>
      </div>


    );
  }
}

export default EventPage_Banner;