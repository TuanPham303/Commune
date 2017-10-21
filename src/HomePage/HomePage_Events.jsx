import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

class HomePage_Events extends Component {
  render() {
    return (
      <div className="container-fluid eventContainer">
        <div className="row">
          <div className="col-4 event">
            <Link to="/event">
              <div className="imgContainer">
                <div className="imgContainerOpacity"></div>
                <img src="http://www.iconsplace.com/icons/preview/purple/rating-star-256.png" alt="starIcon" className="starIcon"/>
              </div>
              <div className="eventDescription">
                <p><b>Event Title:</b> Fancy Meal ($59)</p>
                <p><b>Event Description:</b> An evening of fine ass food. BYOB bitches</p>
                <div className="neighbourhoodAndCapacity row">
                  <p className="col"><b>Neighbourhood:</b> UBC</p>
                  <p className="col"><b>Event Capacity:</b> 10</p>
                </div>
                <div className="hostAndDetailButton row">
                  <div className="col-7 row">
                    <div className="avatar col-4">
                      <img src="http://akns-images.eonline.com/eol_images/Entire_Site/2017210/rs_300x300-170310083229-600.avatar-1.31017.jpg?downsize=300:*&crop=300:300;left,top" alt="" className="avatarImg"/>
                    </div>
                    <div className="col-8 hostDetail">
                      <p>Host Name</p>
                      <div className="row ratingContainer">
                        <img src="http://www.iconsplace.com/icons/preview/purple/rating-star-256.png" alt="" className="col-2 rating"/>
                        <img src="http://www.iconsplace.com/icons/preview/purple/rating-star-256.png" alt="" className="col-2 rating"/>
                        <img src="http://www.iconsplace.com/icons/preview/purple/rating-star-256.png" alt="" className="col-2 rating"/>
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <button className="btn btn-success">Detail</button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-4 event">
            <Link to="/event">
              <div className="imgContainer">
                <div className="imgContainerOpacity"></div>
                <img src="http://www.iconsplace.com/icons/preview/purple/rating-star-256.png" alt="starIcon" className="starIcon"/>
              </div>
              <div className="eventDescription">
                <p><b>Event Title:</b> Fancy Meal ($59)</p>
                <p><b>Event Description:</b> An evening of fine ass food. BYOB bitches</p>
                <div className="neighbourhoodAndCapacity row">
                  <p className="col"><b>Neighbourhood:</b> UBC</p>
                  <p className="col"><b>Event Capacity:</b> 10</p>
                </div>
                <div className="hostAndDetailButton row">
                  <div className="col-7 row">
                    <div className="avatar col-4">
                      <img src="http://akns-images.eonline.com/eol_images/Entire_Site/2017210/rs_300x300-170310083229-600.avatar-1.31017.jpg?downsize=300:*&crop=300:300;left,top" alt="" className="avatarImg"/>
                    </div>
                    <div className="col-8 hostDetail">
                      <p>Host Name</p>
                      <div className="row ratingContainer">
                        <img src="http://www.iconsplace.com/icons/preview/purple/rating-star-256.png" alt="" className="col-2 rating"/>
                        <img src="http://www.iconsplace.com/icons/preview/purple/rating-star-256.png" alt="" className="col-2 rating"/>
                        <img src="http://www.iconsplace.com/icons/preview/purple/rating-star-256.png" alt="" className="col-2 rating"/>
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <button className="btn btn-success">Detail</button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-4 event">
            <Link to="/event">
              <div className="imgContainer">
                <div className="imgContainerOpacity"></div>
                <img src="http://www.iconsplace.com/icons/preview/purple/rating-star-256.png" alt="starIcon" className="starIcon"/>
              </div>
              <div className="eventDescription">
                <p><b>Event Title:</b> Fancy Meal ($59)</p>
                <p><b>Event Description:</b> An evening of fine ass food. BYOB bitches</p>
                <div className="neighbourhoodAndCapacity row">
                  <p className="col"><b>Neighbourhood:</b> UBC</p>
                  <p className="col"><b>Event Capacity:</b> 10</p>
                </div>
                <div className="hostAndDetailButton row">
                  <div className="col-7 row">
                    <div className="avatar col-4">
                      <img src="http://akns-images.eonline.com/eol_images/Entire_Site/2017210/rs_300x300-170310083229-600.avatar-1.31017.jpg?downsize=300:*&crop=300:300;left,top" alt="" className="avatarImg"/>
                    </div>
                    <div className="col-8 hostDetail">
                      <p>Host Name</p>
                      <div className="row ratingContainer">
                        <img src="http://www.iconsplace.com/icons/preview/purple/rating-star-256.png" alt="" className="col-2 rating"/>
                        <img src="http://www.iconsplace.com/icons/preview/purple/rating-star-256.png" alt="" className="col-2 rating"/>
                        <img src="http://www.iconsplace.com/icons/preview/purple/rating-star-256.png" alt="" className="col-2 rating"/>
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <button className="btn btn-success">Detail</button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>  
    );
  }
}

export default HomePage_Events;