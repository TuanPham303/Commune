import React, {Component} from 'react';

export default class NewEventForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      eventTitle: '',
      address: '',
      date: '',
      description: '',
      menu: '',
      price: 0,
      capacity: 0 
    }
  }

  handleNewEvent = (e) => {
    e.preventDefault();
      const newEventData = {
        eventTitle: this.state.eventTitle,
        address: this.state.address,
        date: this.state.date,
        description: this.state.description,
        menu: this.state.menu,
        price: this.state.price,
        capacity: this.state.capacity 
      }
    console.log(newEventData);
    
    $.post('/api/events/new', newEventData)
    .then(() => {
      $('span').click();
    })
    .fail(err => {
      console.log('Failed to create new event ', err);
    })
  }

  handleChange = key => {
    this.setState({
      [key]: this.refs[key].value
    })
  }


  render(){
    return (
      <div className="modal fade" id="newEventModal" tabIndex="-1" role="dialog" aria-labelledby="newEventModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">New Event</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={ this.handleNewEvent }> 
                <div className="form-group">
                  <label>Event Title</label>
                  <input type="text" className="form-control" ref="eventTitle" value ={this.state.eventTitle} onChange={this.handleChange.bind(this, 'eventTitle')}></input>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" className="form-control" ref="address" value ={this.state.address} onChange={this.handleChange.bind(this, 'address')}></input>
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
                  <label>Price</label>
                  <input type="number" className="form-control" min="0" value="0" ref="price" value ={this.state.price} onChange={this.handleChange.bind(this, 'price')}></input>
                </div>
                <div className="form-group">
                  <label>Capacity</label>
                  <input type="number" className="form-control" min="0" value="0" ref="capacity" value ={this.state.capacity} onChange={this.handleChange.bind(this, 'capacity')}></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}