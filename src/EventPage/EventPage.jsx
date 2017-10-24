import React, {Component} from 'react';
import NavBar from '../NavBar.jsx';
import EventPage_Banner from './EventPage_Banner.jsx';
import EventPage_Menu from './EventPage_Menu.jsx';
import EventPage_Review from './EventPage_Review.jsx';

const moment = require('moment');


class EventPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      eventDetail: {
        title: '',
        price: '',
        date: '',
        capacity: '',
        description: '',
        menu: '',
      }
    }
  }

  componentDidMount(){
    const eventId = this.props.match.params.id;
    const eventDetail = () => {
      $.ajax({
        method: "GET",
        url: `/api/events/${eventId}`,
        success: data => {
          console.log('data', data);
          this.setState({
            eventDetail: {
              title: data[0].title,
              price: data[0].price,
              capacity: data[0].capacity,
              date: moment(data[0].event_date).format('MMMM Do YYYY, h:mm a'),
              description: data[0].description,
              menu: data[0].menu_description,
            }
          })
        }
      })
    }
    eventDetail();
  }

  render() {
    return (
      <div>
        <NavBar />
        <EventPage_Banner 
          title={this.state.eventDetail.title}
          price={this.state.eventDetail.price}
          capacity={this.state.eventDetail.capacity}
          date={this.state.eventDetail.date}
          description={this.state.eventDetail.description}
         />   
        <EventPage_Menu 
          menu={this.state.eventDetail.menu}
        />
        <EventPage_Review />
      </div>
     
    );
  }
}

export default EventPage;