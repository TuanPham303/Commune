import React, {Component} from 'react';


class EventPage_Menu extends Component {

  constructor(props){
    super(props)
  }

  render() {
    let menu;

    if (this.props.menu) {
      menu = (
        <div className="container-fluid menuContainer">
          <h3>MENU</h3>
          <div className="row justify-content-center">
            <div className="col-8">
              {this.props.menu}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        { menu }
      </div>
    );
  }
}

export default EventPage_Menu;