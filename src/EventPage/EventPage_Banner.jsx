import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import EventPage_Map from './EventPage_Map.jsx'



class EventPage_Banner extends Component {
  constructor(props){
    super(props);
    this.state = {
      hosts: [
        {
          position: 'host',
          name: 'Tuan Pham',
          avatar_url: 'https://lh3.googleusercontent.com/uiaClJClnocWByL83EOkxd6LcvRR2jW17KAfIzEj7GgM8iNtv9l4QR32OznMw12gYIKU=w300'
        },
        {
          position: 'host',
          name: 'Russell',
          avatar_url: 'http://i.imgur.com/Q4vpATV.png'
        },
        {
          position: 'chef',
          name: 'Scotty',
          avatar_url: 'https://pm1.narvii.com/5751/3d2309125d7bb9e8d7f35bce5cde273326f999c4_hq.jpg'
        },
        {
          position: 'chef',
          name: 'Spencer',
          avatar_url: 'https://www.seoclerk.com/pics/68213-2.jpg'
        }
      ]
    }
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
         console.log( this.props.getGuestList());
         this.props.getGuestList();
        })
      } else { return alert('Booking failed')}
    });
  }

  stripeKey = () => {
    console.log(process.env.STRIPE_PUBLIC_KEY);
    return process.env.STRIPE_PUBLIC_KEY;
  }

  

  render() {
 
    
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
                  <div className="carousel-item active">
                    <img className="d-block img-fluid" src="https://yt3.ggpht.com/-MlnvEdpKY2w/AAAAAAAAAAI/AAAAAAAAAAA/tOyTWDyUvgQ/s900-c-k-no-mo-rj-c0xffffff/photo.jpg" alt="First slide"></img>
                    <div className="carousel-caption d-none d-md-block">
                      <h3>Avatar</h3>
                      <p>Blue skin</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img className="d-block img-fluid" src="https://yt3.ggpht.com/-MlnvEdpKY2w/AAAAAAAAAAI/AAAAAAAAAAA/tOyTWDyUvgQ/s900-c-k-no-mo-rj-c0xffffff/photo.jpg" alt="Second slide"></img>
                    <div className="carousel-caption d-none d-md-block">
                      <h3>Avatar</h3>
                      <p>Blue skin too</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img className="d-block img-fluid" src="https://yt3.ggpht.com/-MlnvEdpKY2w/AAAAAAAAAAI/AAAAAAAAAAA/tOyTWDyUvgQ/s900-c-k-no-mo-rj-c0xffffff/photo.jpg" alt="Third slide"></img>
                    <div className="carousel-caption d-none d-md-block">
                      <h3>Avatar</h3>
                      <p>Also Blue skin</p>
                    </div>
                  </div>
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
                stripeKey="pk_test_sGbT8bXukJ6CeBSOv11ATC4r" 
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
              <EventPage_Map 
                location={this.props.location}
              />
            </div>
          </div>
        </div>
      </div>


    );
  }
}

export default EventPage_Banner;