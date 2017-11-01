import React, {Component} from 'react';

export default class EditEventForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      eventTitle: this.props.event.title,
      address: '',
      city: '',
      date: '',
      description: this.props.event.description,
      menu: this.props.event.menu_description,
      price: this.props.event.price,
      capacity: this.props.event.capacity,
      image: this.props.event.image_url
    }
  }

  handleAddress = () => {
    let fullAddress = this.props.event.address;
    const address = fullAddress.substr(0, fullAddress.indexOf(','));
    fullAddress = fullAddress.substr(fullAddress.indexOf(',') + 2);
    const city = fullAddress.substr(0, fullAddress.indexOf(','));
    this.setState({
      address: address,
      city: city
    })
  }

  handleDate = () => {
    const date = this.props.event.event_date.substr(0, this.props.event.event_date.indexOf('.'))
    this.setState({
      date: date
    })
  }

  componentWillMount(){
    this.handleAddress();
    this.handleDate();
  }

  handleNewEvent = (e) => {
    e.preventDefault();
    const newEventData = {
      users: [{user: this.props.currentUser.id, role: 2}],
      title: this.state.eventTitle,
      address: this.state.address,
      city: this.state.city,
      date: this.state.date,
      description: this.state.description,
      menu: this.state.menu,
      price: this.state.price,
      capacity: this.state.capacity,
      image: this.state.image
    }

    $.post(`/api/events/${this.props.event.event_id}/edit`, newEventData)
    .then(() => {
      document.location.assign(`/events/${this.props.event.event_id}`);
    })
  }

  handleChange = key => {
    this.setState({
      [key]: this.refs[key].value
    })
  }


  render(){
    return (
      <div className="modal fade" id="editEventModal" tabIndex="-1" role="dialog" aria-labelledby="editEventModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">Edit Event</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={ this.handleNewEvent }>
                <div className="form-group">
                  <label>Event Title</label>&nbsp;&nbsp;<label className='redErrMsg hidden' id='titleErrMsg'>Required</label>
                  <input type="text" className="form-control" placeholder= 'Required' ref="eventTitle" value={this.state.eventTitle} onChange={this.handleChange.bind(this, 'eventTitle')}></input>
                </div>
                <div className="form-group">
                  <label>Address</label>&nbsp;&nbsp;<label className='redErrMsg hidden' id='addressErrMsg'>Required</label>
                  <input type="text" className="form-control" placeholder= 'Required' ref="address" value ={this.state.address} onChange={this.handleChange.bind(this, 'address')}></input>
                </div>
                <div className="form-group">
                  <label>City</label>&nbsp;&nbsp;<label className='redErrMsg hidden' id='cityErrMsg'>Required</label>
                  <input type="text" className="form-control" placeholder= 'Required' ref="city" value ={this.state.city} onChange={this.handleChange.bind(this, 'city')}></input>
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="datetime-local" className="form-control" ref="date" value ={this.state.date} onChange={this.handleChange.bind(this, 'date')}></input>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea type="text" className="form-control" ref="description" value ={this.state.description} onChange={this.handleChange.bind(this, 'description')}></textarea>
                </div>
                <div className="form-group">
                  <label>Menu Description</label>
                  <textarea type="text" className="form-control" ref="menu" value ={this.state.menu} onChange={this.handleChange.bind(this, 'menu')}></textarea>
                </div>
                <div className="form-group">
                  <label>Price</label>&nbsp;&nbsp;<label className='redErrMsg hidden' id='priceErrMsg'>Must be greater than $0</label>
                  <input type="number" className="form-control" placeholder= 'Required' min="0" ref="price" value={this.state.price} onChange={this.handleChange.bind(this, 'price')}></input>
                </div>
                <div className="form-group">
                  <label>Capacity</label>&nbsp;&nbsp;<label className='redErrMsg hidden' id='capacityErrMsg'>Must be greater than 0</label>
                  <input type="number" className="form-control" placeholder= 'Required' min="0" ref="capacity" value ={this.state.capacity} onChange={this.handleChange.bind(this, 'capacity')}></input>
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input type="text" className="form-control" ref="image" value ={this.state.image} onChange={this.handleChange.bind(this, 'image')}></input>
                </div>
                <button type="submit" className="btn btn-primary clickable" id='newEventButton'>Submit</button>
                &nbsp;&nbsp;&nbsp;<span className='redErrMsg hidden' id='newEventErrMsg'>Error saving event. Please check your inputs!</span>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}