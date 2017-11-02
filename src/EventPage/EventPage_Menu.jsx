import React, {Component} from 'react';


class EventPage_Menu extends Component {

  constructor(props){
    super(props);
  }

  render() {

    return (
      <div className="container-fluid menuContainer">
        <div className="row">
          <div className="col-12 justify-content-center">
            <h3>MENU</h3>
            <div className="col-12 ">
              <pre>
                {this.props.menu}
              </pre>
            </div>
          </div>
          <div className="triangleBottom"></div>
        </div>
      </div>
    );
  }
}

export default EventPage_Menu;