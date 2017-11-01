import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default class EventPage_GuestList extends Component {

  constructor(props){
    super(props)
  }

  render() {
    const guests = this.props.guestList.map(guest => {
      return <li className="list-group-item" key={guest.id}>
        <div className="guestlist-item">
          <img src={guest.avatar} alt="avatar" className="thumbnail"></img>
          <Link to={`/users/${guest.id}`}className="guestlist-name">{guest.role_name} - {guest.first_name} {guest.last_name} </Link>
        </div>
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
