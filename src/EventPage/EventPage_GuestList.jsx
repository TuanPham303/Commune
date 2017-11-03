import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default class EventPage_GuestList extends Component {

  constructor(props){
    super(props)
  }

  render() {
    const guests = this.props.guestList.map(guest => {
      return <li className="list-group-item guestList" key={guest.id}>
        <Link to={`/users/${guest.id}`} className="invisilink">
          <div className="guestlist-item">
            <img src={guest.avatar} alt="avatar" className="thumbnail"></img>&nbsp;
            <p className='guestlist-name'>{guest.role_name[0].toUpperCase()}{guest.role_name.slice(1)} - {guest.first_name} {guest.last_name}</p>
          </div>
        </Link>
      </li>
    });
    return (
      <div className="container-fluid guessListContainer">
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
