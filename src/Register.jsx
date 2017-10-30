import React, {Component} from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      r_first_name: '',
      r_last_name: '',
      email: '',
      password: ''
    }
  }

  handleRegister = event => {

    const data = new FormData();
    const imageData= document.querySelector('input[type="file"]').files[0];
    const registerData = {
      first_name: this.state.r_first_name,
      last_name: this.state.r_last_name,
      email: this.state.email,
      password: this.state.password,
    }
    const first_name = this.state.r_first_name;
    const last_name = this.state.r_last_name;
    const email = this.state.email;
    const password = this.state.password;
    data.append("avatar",imageData);
    data.append("first_name", first_name);
    data.append("last_name", last_name);
    data.append("email", email);
    data.append("password", password);
    event.preventDefault();
    fetch("/api/users/register",{
      method: "POST",
      credentials: 'include',
      body: data
    })
    .then(user => {
      this.setState({
        r_first_name: '',
        r_last_name: '',
        email: '',
        password: ''
      })
      this.props.getCurrentUser();
      $('span').click();
    })
    .catch(err => {
      console.log('Failed to Login', err);
    })
  }

  handleChange = key => {
    this.setState({
      [key]: this.refs[key].value
    })
  }


  render() {
    return (
      <div className="modal fade" id="signupModal" tabIndex="-1" role="dialog" aria-labelledby="signupModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="signupModalLabel">Join the Commun(e)ity</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={ this.handleRegister }>
                <div className="form-group">
                  <label htmlFor="signupFirstName">FIRST NAME</label>
                  <input type="text" ref="r_first_name"className="form-control" id="signupFirstName" placeholder="Joe" value ={this.state.r_first_name} onChange={ this.handleChange.bind(this, 'r_first_name') }></input>
                </div>
                <div className="form-group">
                  <label htmlFor="signupLastName">LAST NAME</label>
                  <input type="text" ref="r_last_name" className="form-control" id="signupLastName" placeholder="Smith" value ={this.state.r_last_name} onChange={this.handleChange.bind(this, 'r_last_name')}></input>
                </div>
                <div className="form-group">
                  <label htmlFor="signupEmail">EMAIL</label>
                  <input type="email" ref="email" className="form-control" id="signupEmail" placeholder="email@example.com" value ={this.state.email} onChange={this.handleChange.bind(this, 'email')}></input>
                </div>
                <div className="form-group">
                  <label htmlFor="signupPassword">PASSWORD</label>
                  <input type="password" ref="password" className="form-control" id="signupPassword" placeholder="Password" value ={this.state.password} onChange={this.handleChange.bind(this, 'password')}></input>
                </div>
                <div className="form-group">
                  <input type="file" className="form-input-control" name='avatar'></input>
                </div>
                <button type="submit" className="btn btn-primary" >Signup</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;