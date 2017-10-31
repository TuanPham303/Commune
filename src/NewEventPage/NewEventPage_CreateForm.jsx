import React, {Component} from 'react';

class NewEventPage_CreateForm extends Component {

  constructor(props){
    super(props)

    this.state = {
      title: '',
      address: '',
      city: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div style={{'paddingTop': '80px'}}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input type='text' name='title' placeholder='Name of the event' value={this.state.title} onChange={this.handleChange} />
          </label>
          <label>
            Street Address:
            <input type='text' name='address' placeholder='Where the event will be' value={this.state.address} onChange={this.handleChange} />
          </label>
          <label>
            City:
            <input type='text' name='city' placeholder='Where the event will be' value={this.state.city} onChange={this.handleChange} />
          </label>

          <label>
            City:
            <input type='text' name='city' placeholder='Where the event will be' value={this.state.city} onChange={this.handleChange} />
          </label>

          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

export default NewEventPage_CreateForm;