import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div style={{
    position: 'relative', color: 'white', background: 'blue', opacity: '0.5',
    height: 100, width: 100, top: -20, left: -30, borderRadius: '50%'   
  }}></div>;
 
export default class EventPage_Map extends Component {
  state = {
    center: {lat: this.props.location.x, lng: this.props.location.y},
    zoom: 11
  };
 
  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{key: "AIzaSyBKKwK2AfjqhjmwQKaUvWxXwFOVMY_rgn4"}}
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
      >
        <AnyReactComponent
          lat={this.props.location.x}
          lng={this.props.location.y}
        />
      </GoogleMapReact>
    );
  }
}