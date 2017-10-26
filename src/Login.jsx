import React, {Component} from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleLogin = event => {

    const loginData = {
      email: this.state.email,
      password: this.state.password
    }

    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/api/users/login",
      data: loginData
    })
    .done(user => {
      this.setState({
        email: '',
        password: ''
      })
    })
    .fail(err => {
      console.log('Failed to Login', err);
    })
  }

  emailChange = event => {
    this.setState({
      email: event.target.value
    })
    
  }

  passwordChange = event => {
    this.setState({
      password: event.target.value
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
              <form onSubmit={ this.handleLogin }>
                <div className="form-group">
                  <label htmlFor="loginEmail">EMAIL</label>
                  <input type="email" className="form-control" id="loginEmail" placeholder="email@example.com" value ={this.state.email} onChange={this.emailChange}></input>
                </div>
                <div className="form-group">
                  <label htmlFor="loginPassword">PASSWORD</label>
                  <input type="password" className="form-control" id="loginPassword" placeholder="Password" value ={this.state.password} onChange={this.passwordChange}></input>
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;