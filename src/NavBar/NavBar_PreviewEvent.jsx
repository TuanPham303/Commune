import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'

class NavBar_PreviewEvent extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const hostItem = (
      <div>
        {this.props.host.length > 0 &&
          <Link to={`/users/${this.props.host[1]}`} style={{ textDecoration: 'none' }}>
            <div key={this.props.host[1]} className="dropdown-item searchItem" data-user-id={this.props.host[1]}>
              <div className="icon-identifier"><i className="fa fa-bell" aria-hidden="true"></i></div>
              <div>Host {this.props.host[0]}</div>
            </div>
          </Link>
        }
        {this.props.host.length > 0 &&
          <div className="dropdown-divider navsearch-divider"></div>
        }
      </div>
    );
    const chefItem = (
      <div>
        {this.props.chef.length > 0 &&
          <Link to={`/users/${this.props.chef[1]}`} style={{ textDecoration: 'none' }}>
            <div key={this.props.chef[1]} className="dropdown-item searchItem" data-user-id={this.props.chef[1]}>
              <div className="icon-identifier"><i className="fa fa-fire" aria-hidden="true"></i></div>
              <div>Chef {this.props.chef[0]}</div>
            </div>
          </Link>
        }
        {this.props.chef.length > 0 &&
          <div className="dropdown-divider navsearch-divider"></div>
        }
      </div>
    );
    const eventItem = (
    <div>
        <Link to={`/events/${this.props.event_id}`} style={{ textDecoration: 'none' }}>
          <div key={this.props.event_id} className="dropdown-item searchItem" data-event-id={this.props.event_id}>
            <div className="icon-identifier"><i className="fa fa-spoon" aria-hidden="true"></i></div>
            <div><b>{this.props.title}</b></div>
            <div>{this.props.neighbourhood}</div>
            <div>${this.props.price}</div>
          </div>
        </Link>
      <div className="dropdown-divider navsearch-divider"></div>
    </div>
    );
    return (
      <div>
        { eventItem }
        { hostItem }
        { chefItem }
      </div>
    )
  };
}

export default NavBar_PreviewEvent;