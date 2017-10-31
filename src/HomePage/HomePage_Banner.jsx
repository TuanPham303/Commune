import React, {Component} from 'react';

class HomePage_Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
    }
  }

  changeHandler = event => {
    this.setState({ searchString: event.target.value })
  }

  onSearch = event => {
    event.preventDefault();
    if (this.state.searchString.trim() === '') {
      this.props.previewEvents();
      return;
    }
    this.props.getSearchResults(this.state.searchString);
    this.setState({ searchString: '' })
  }

  render() {
    return (
      <div>
        <div className="homePageBanner">
          <div className="clip">

          </div>
          <div className="homePageBannerSearch">
            <h1 className="search-title">Experience Food as an Art Form</h1>
            <form className="form-inline my-2 my-lg-0" onSubmit={this.onSearch} >
              <input className="form-control mr-sm-2 homePageBannerSearchBox" type="text" name="query" value={this.state.searchString} onChange={this.changeHandler} aria-label="Search" placeholder="Press enter to search"></input>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage_Banner;