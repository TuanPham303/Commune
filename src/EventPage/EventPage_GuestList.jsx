import React, {Component} from 'react';


export default class EventPage_GuestList extends Component {

  constructor(props){
    super(props)
  }

  render() {
    const guests = this.props.guestList.map(guest => {
      return <li className="list-group-item" key={guest.id}>
        {guest.first_name} {guest.last_name}
      </li>
    });

    return (
      <div className="container-fluid menuContainer">
        <h3>Guests List</h3> 
        <div className="row justify-content-center">
          <div className="col-5">
            { guests }
          </div>
        </div>
      </div>
     
    );
  }
}
