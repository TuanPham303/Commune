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
    this.previewEvents();
  }

  previewEvents = () => {
    $.ajax({
      method: "GET",
      url: "/api/events",
      success: data => {
        data.forEach(event => {
          if(event.description && event.description.length > 100){
            event.description = event.description.substring(0, 100) + '...'
          }
        })
        this.setState({
          previewEvents: this.state.previewEvents.concat(data)
        })
      }
    })
  }

  getSearchResults = searchData => {
    const searchValue = searchData.replace(/&/g," ").replace(/  +/g, ' ')
    $.ajax({
      method: "GET",
      url: `/api/events/search?search=${searchValue}`
    })
    .done(result => {
      result.forEach(event => {
        if (event.description && event.description.length > 100) {
          event.description = event.description.substring(0, 100) + '...'
        }
      })
      this.setState({
        previewEvents: result,
      })
     document.getElementsByClassName('imgContainer')[0].scrollIntoView({ behavior: 'smooth'  });
    })
    .fail(e => {
      console.error(e);
    });
  }

  render() {
    return (
      <div className="homeWrapper">
        <div className='fullscreen-bg'>
            <video autoPlay loop muted className="fullscreen-bg__video">
              <source src="https://11-lvl3-pdl.vimeocdn.com/01/3260/3/91303466/242154421.mp4?expires=1509593511&token=0251a560f94d38356b569" type="video/mp4"/>
              <source src="https://11-lvl3-pdl.vimeocdn.com/01/3260/3/91303466/242154421.mp4?expires=1509593511&token=0251a560f94d38356b569" type="video/webm"/>
              <img alt="" src="https://d3mlfyygrfdi2i.cloudfront.net/Screen_Shot_2017-09-11_at_3.57.10_PM.png"/>
              You need an HTML5 enabled browser to view this video.
            </video>
        </div>
        <HomePage_Banner getSearchResults={this.getSearchResults} previewEvents={this.previewEvents} />
        <HomePage_Events
          previewEvents={this.state.previewEvents}
        />
      </div>
    );
  }
}

export default HomePage;
