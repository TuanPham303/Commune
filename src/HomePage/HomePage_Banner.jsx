import React, {Component} from 'react';

class HomePage_Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ''
    }
  }

  componentWillMount () {
    console.log(this.props)
  }

  changeHandler = event => {
    this.setState({ searchString: event.target.value })
    console.log(this.state)
  }

  onSearch = event => {
    console.log("in onSearch", this.state)
    event.preventDefault();
    console.log("this is the event right? :", event);
    this.props.getSearchResults(this.state.searchString);
    event.target.value = ''
  }

  render() {
    return (
      <div>
        <div className="homePageBanner">
          <div className="clip">
            <video className="video" autoPlay loop muted style={{zIndex:98}}>
              <source src="https://d3mlfyygrfdi2i.cloudfront.net/Assemble_Hero_Loop_desktop.mp4" type="video/mp4"/>
              <source src="https://d3mlfyygrfdi2i.cloudfront.net/Assemble_Hero_Loop_webm.webm" type="video/webm"/>
              <img alt="" src="https://d3mlfyygrfdi2i.cloudfront.net/Screen_Shot_2017-09-11_at_3.57.10_PM.png"/>
              You need an HTML5 enabled browser to view this video.
            </video>
          </div>
          <div className="homePageBannerSearch">
            <h1 className="search-title">Experience Food as an Art Form</h1>
            <form className="form-inline my-2 my-lg-0" onSubmit={this.onSearch} >
            <input className="form-control mr-sm-2 homePageBannerSearchBox" type="text" name="query" onChange={this.changeHandler} placeholder="Search"></input>
            <button className="btn btn-outline-success my-2 my-sm-0 homePageBannerSearchButton" type="submit" value="Submit">Search</button>
          </form>
          </div>
          
        </div>
      </div>
    );
  }
}

export default HomePage_Banner;