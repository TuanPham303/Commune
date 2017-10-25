import React, {Component} from 'react';

class Login extends Component {

  handleLogin = event => {
    $.ajax({
      method: "GET",
      url: "/api/users/login",
      success: data => {
        console.log(data);
  
      }
    })
  }
  
  
  render() {
    return (
      <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">Login</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="loginEmail">EMAIL</label>
                  <input type="email" className="form-control" id="loginEmail" placeholder="email@example.com"></input>
                </div>
                <div className="form-group">
                  <label for="loginPassword">PASSWORD</label>
                  <input type="password" className="form-control" id="loginPassword" placeholder="Password"></input>
                </div>
                <button type="submit" className="btn btn-primary" onSubmit={ this.handleLogin }>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;