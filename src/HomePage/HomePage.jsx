import React, {Component} from 'react';
import NavBar from '../NavBar.jsx';
import HomePage_Banner from './HomePage_Banner.jsx';
import HomePage_Events from './HomePage_Events.jsx';

class HomePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      previewEvents: []
    }
  }

  componentDidMount(){
    const previewEvents = () => {
      $.ajax({
        method: "GET",
        url: "/api/events",
        success: data => {
          this.setState({
            previewEvents: this.state.previewEvents.concat(data)
          })
        }
      })
    }
    previewEvents();
  }

  render() {
    return (
      <div className="homeWrapper">
        <div className='fullscreen-bg'>
            <video autoPlay loop muted className="fullscreen-bg__video">
              <source src="https://d3mlfyygrfdi2i.cloudfront.net/Assemble_Hero_Loop_desktop.mp4" type="video/mp4"/>
              <source src="https://d3mlfyygrfdi2i.cloudfront.net/Assemble_Hero_Loop_webm.webm" type="video/webm"/>
              <img alt="" src="https://d3mlfyygrfdi2i.cloudfront.net/Screen_Shot_2017-09-11_at_3.57.10_PM.png"/>
              You need an HTML5 enabled browser to view this video.
            </video>
        </div>
        <HomePage_Banner />
        <HomePage_Events
          previewEvents={this.state.previewEvents}
        />
      </div>
    );
  }
}

export default HomePage;
