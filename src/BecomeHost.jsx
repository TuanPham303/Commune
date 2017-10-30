import React, {Component} from 'react';

export default class BecomeHost extends Component {
  constructor(props){
    super(props);
    this.state = {
      becomeHost: false
    }
  }

  handleBecomeHost = (e) => {
    e.preventDefault();
    let becomeHost = this.state.becomeHost;
    becomeHost = becomeHost === 'true'? true : false;
    
    if (becomeHost === true){   
      $.post('/api/users/becomehost')
      .done(() => {
        this.props.getCurrentUser();
        $('.xButton').click();
      })
      .fail(err => {
        console.log('Failed to become host', err);
      })
    }
  }

  handleChange = key => {
    this.setState({
      [key]: this.refs[key].value
    })
  }


  render(){
    return (
      <div className="modal fade" id="becomeHostModal" tabIndex="-1" role="dialog" aria-labelledby="becomeHostModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">Do you want to become a host?</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" className="xButton">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={ this.handleBecomeHost }> 
                <div className="input-group">
                  <span className="input-group-addon">
                    <input type="checkbox" value='true' ref="becomeHost" onChange={this.handleChange.bind(this, 'becomeHost')} />
                  </span>
                  <label className="form-control">I agree with the term of service</label>
                </div> <br/>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}