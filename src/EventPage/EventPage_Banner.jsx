import React, {Component} from 'react';

class EventPage_Banner extends Component {
  render() {
    return (
      <div className="eventBanner container-fluid">
        <div className="row">
          <div className="image col-4">
            <img src="https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg" alt=""/>
          </div>
          <div className="image col-4">
            <img src="https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg" alt=""/>
          </div>
          <div className="image col-4">
            <img src="https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg" alt=""/>
          </div>
        </div>

        <div className="eventDetail">
          <div className="eventTitle">
            <h3>Fancy Dinner ($59)</h3>
          </div>
          <div className="row">
            <div className="hostImages col-4">
              <div id="carouselExampleControls" className="carousel slide imagesSlider" data-ride="carousel">
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                    <img className="d-block img-fluid" src="https://yt3.ggpht.com/-MlnvEdpKY2w/AAAAAAAAAAI/AAAAAAAAAAA/tOyTWDyUvgQ/s900-c-k-no-mo-rj-c0xffffff/photo.jpg" alt="First slide"></img>
                    <div className="carousel-caption d-none d-md-block">
                      <h3>Avatar</h3>
                      <p>Blue skin</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img className="d-block img-fluid" src="https://yt3.ggpht.com/-MlnvEdpKY2w/AAAAAAAAAAI/AAAAAAAAAAA/tOyTWDyUvgQ/s900-c-k-no-mo-rj-c0xffffff/photo.jpg" alt="Second slide"></img>
                    <div className="carousel-caption d-none d-md-block">
                      <h3>Avatar</h3>
                      <p>Blue skin too</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img className="d-block img-fluid" src="https://yt3.ggpht.com/-MlnvEdpKY2w/AAAAAAAAAAI/AAAAAAAAAAA/tOyTWDyUvgQ/s900-c-k-no-mo-rj-c0xffffff/photo.jpg" alt="Third slide"></img>
                    <div className="carousel-caption d-none d-md-block">
                      <h3>Avatar</h3>
                      <p>Also Blue skin</p>
                    </div>
                  </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
            <div className="col-4">
              <div className="eventInfo">
                <div className="date">
                  <strong>Date</strong>
                  <p>Friday 13rd 2017, 8am - 8am</p>
                </div>
                <div className="capacity">
                  <strong>Capacity</strong>
                  <p>10 people</p>
                </div>
                <div className="description">
                  <strong>Description</strong>
                  <p>hahahahahahahaha hehehehehehehehehe</p>
                </div>
                <button className="btn btn-primary">Book now</button> 
              </div>
            </div>
            <div className="col-4">
              <div className="eventMap">
                <img src="https://duncan99.files.wordpress.com/2015/03/bounds-map1.png?w=641&h=479" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    );
  }
}

export default EventPage_Banner;