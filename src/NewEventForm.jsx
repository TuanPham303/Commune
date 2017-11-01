import React, {Component} from 'react';

export default class NewEventForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      eventTitle: '',
      address: '',
      city: '',
      date: '',
      description: '',
      menu: '',
      price: 0,
      capacity: 0,
    }
  }

  handleNewEvent = (e) => {
    const data = new FormData();
    const imageData= document.getElementById('fileinput').files;
    const user = this.props.currentUser.id
    const role = 2;
    const title = this.state.eventTitle;
    const address = this.state.address;
    const city = this.state.city;
    const date = this.state.date;
    const description = this.state.description;
    const menu = this.state.menu;
    const price = this.state.price;
    const capacity = this.state.capacity;

    for (let image of imageData) {
      data.append('images', image)
    }

    // data.append("images[]", imageData);
    data.append("user", user);
    data.append("role", role);
    data.append("title", title);
    data.append("address", address);
    data.append("city", city);
    data.append("date", date);
    data.append("description", description);
    data.append("menu", menu);
    data.append("price", price);
    data.append("capacity", capacity);
    console.log(data);
    e.preventDefault();
      // const newEventData = {
      //   users: [{user: this.props.currentUser.id, role: 2}], //
      //   title: this.state.eventTitle,
      //   address: this.state.address,
      //   city: this.state.city, //
      //   date: this.state.date,
      //   description: this.state.description,
      //   menu: this.state.menu,
      //   price: this.state.price,
      //   capacity: this.state.capacity,
      //   image: this.state.image //
      // }
    let resOK;
    fetch('/api/events/new', {
      method: 'POST',
      credentials: 'include',
      body: data
    })
    .then((response) => {
      resOK = response.ok;
      return response.json();
    }).then((data) => {
      if (resOK) {
        document.location.assign(`/events/${data}`);
      } else {
        $('.redErrMsg').addClass('hidden');
        $('#newEventErrMsg').removeClass("hidden");
        $('#newEventButton').removeClass('btn-primary').addClass('btn-danger');
        data.forEach((error) => {
          $(`#${error}`).removeClass("hidden");
        })
      }
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
                  <label>Event Title</label>&nbsp;&nbsp;<label className='redErrMsg hidden' id='titleErrMsg'>Required</label>
                  <input type="text" className="form-control" placeholder= 'Required' ref="eventTitle" value ={this.state.eventTitle} onChange={this.handleChange.bind(this, 'eventTitle')}></input>
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
                  <input type="number" className="form-control" placeholder= 'Required' min="0" ref="price" value ={this.state.price} onChange={this.handleChange.bind(this, 'price')}></input>
                </div>
                <div className="form-group">
                  <label>Capacity</label>&nbsp;&nbsp;<label className='redErrMsg hidden' id='capacityErrMsg'>Must be greater than 0</label>
                  <input type="number" className="form-control" placeholder= 'Required' min="0" ref="capacity" value ={this.state.capacity} onChange={this.handleChange.bind(this, 'capacity')}></input>
                </div>
                <div className="form-group">
                  <label>Images</label>
                  <input type="file" className="form-input-control" name='images' id="fileinput"multiple></input>
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