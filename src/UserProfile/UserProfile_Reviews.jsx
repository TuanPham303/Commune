import React, {Component} from 'react';

class UserProfile_Reviews extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="reviews row justify-content-center">
          <div className="col-8">
            <h3>Reviews:</h3>
            <div className="row review">
              <div className="col-2">
                <div className="avatar">
                  <img src="https://s3.amazonaws.com/lighthouse-compass2/uploads/student/custom_avatar/1300/thumb_scottyface.jpg" alt=""/>
                </div>
              </div>
              <div className="content col-10">
                <div>
                <h5>Coty</h5>
                <p>Love her, AWESOME chef!!!</p>
                </div>
              </div>
              <hr/>
            </div><hr/>
            <div className="row review">
              <div className="col-2">
                <div className="avatar">
                  <img src="https://s3.amazonaws.com/lighthouse-compass2/uploads/student/custom_avatar/1300/thumb_scottyface.jpg" alt=""/>
                </div>
              </div>
              <div className="content col-10">
                <div>
                <h5>Coty</h5>
                <p>Love her, AWESOME chef!!!</p>
                </div>
              </div>
              <hr/>
            </div><hr/>
            <div className="row review">
              <div className="col-2">
                <div className="avatar">
                  <img src="https://s3.amazonaws.com/lighthouse-compass2/uploads/student/custom_avatar/1300/thumb_scottyface.jpg" alt=""/>
                </div>
              </div>
              <div className="content col-10">
                <div>
                <h5>Coty</h5>
                <p>Love her, AWESOME chef!!!</p>
                </div>
              </div>
              <hr/>
            </div><hr/>
            
            
          </div>
        </div>
      </div>  
    );
  }
}

export default UserProfile_Reviews;