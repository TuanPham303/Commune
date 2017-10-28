import React, {Component} from 'react';
import NavBar from '../NavBar.jsx';
import NewEventPage_CreateForm from'./NewEventPage_CreateForm.jsx';

class NewEventPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <NewEventPage_CreateForm />
      </div>
    );
  }
}

export default NewEventPage;