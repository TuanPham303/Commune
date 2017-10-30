import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{
    position: 'relative', color: 'white', background: 'blue', opacity: '0.5',
    height: 80, width: 80, top: -20, left: -30, borderRadius: '50%'
  }}></div>;

export default class EventPage_Map extends Component {
  state = {
    center: {lat: this.props.location.x, lng: this.props.location.y},
    zoom: 13
  };

  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{key: this.props.googleMapKey}}
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