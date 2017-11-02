import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'

class NavBar_PreviewEvent extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const userItem = (
      <div>
        {this.props.user_id &&
          <Link to={`/users/${this.props.user_id}`} style={{ textDecoration: 'none' }}>
            <div key={this.props.user_id} className="dropdown-item searchItem" data-user-id={this.props.user_id}>
              <div className="icon-identifier"><i className="fa fa-user" aria-hidden="true"></i></div>
              <div><b>{this.props.first_name} {this.props.last_name}</b></div>
            </div>
          </Link>
        }
        {this.props.user_id &&
          <div className="dropdown-divider navsearch-divider"></div>
        }
      </div>
    );
    const eventItem = (
      <div>
        {this.props.event_id &&
          <Link to={`/events/${this.props.event_id}`} style={{ textDecoration: 'none' }}>
            <div key={this.props.event_id} className="dropdown-item searchItem" data-event-id={this.props.event_id}>
              <div className="icon-identifier"><i className="fa fa-spoon" aria-hidden="true"></i></div>
              <div><b>{this.props.title}</b></div>
              <div>{this.props.neighbourhood}</div>
              <div>${this.props.price}</div>
            </div>
          </Link>
        }
        {this.props.event_id &&
        <div className="dropdown-divider navsearch-divider"></div>
        }
      </div>
    );
    return (
      <div>
        { eventItem }
        { userItem }
      </div>
    )
  };
}

export default NavBar_PreviewEvent;