import React, {Component} from 'react';

class HomePage_Banner extends Component {
  render() {
    return (
      <div>
        <div className="homePageBanner">
          <div className="clip">

          </div>
          <div className="homePageBannerSearch">
            <h1 className="search-title">Experience Food as an Art Form</h1>
            <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2 homePageBannerSearchBox" type="text" placeholder="Search" aria-label="Search"></input>
            <button className="btn btn-outline-success my-2 my-sm-0 homePageBannerSearchButton" type="submit">Search</button>
          </form>
          </div>

        </div>
      </div>
    );
  }
}

export default HomePage_Banner;