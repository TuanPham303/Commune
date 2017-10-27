import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

class NavBar_PreviewEvent extends Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <button className="dropdown-item searchItem" type="button">
          <b> {this.props.title} </b>
          <br />
          {this.props.neighbourhood}
        </button>
        <div className="dropdown-divider"></div>
      </div>
    )
  };
}

export default NavBar_PreviewEvent;