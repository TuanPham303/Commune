import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HomePage_PreviewEvent from "./HomePage_PreviewEvent.jsx";

class HomePage_Events extends Component {
  constructor(props){
    super(props);
  }

  
 

  render() {
    console.log('all events', this.props.previewEvents);
    const previewEvents = this.props.previewEvents.map( previewEvent => {
      return <HomePage_PreviewEvent 
        title={previewEvent.title}
        price={previewEvent.price}
        description={previewEvent.description}
        neighbourhood={previewEvent.neighbourhood}
        capacity={previewEvent.capacity}
        eventId={previewEvent.id}
      />
      });
    return(
      <div className="container-fluid eventContainer">
        <div className="row">
         { previewEvents }
        </div>
      </div>
    );
  }
}

export default HomePage_Events;