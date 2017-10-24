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
          console.log(data);
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
      <div className="wrapper">
        <NavBar />
        <HomePage_Banner />
        <HomePage_Events 
          previewEvents={this.state.previewEvents}
        />
      </div>  
    );
  }
}

export default HomePage;
