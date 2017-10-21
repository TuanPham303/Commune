import React, {Component} from 'react';

class HomePage_Banner extends Component {
  render() {
    return (
      <div className="container-fluid homePageBanner">
        <form className="form-inline my-2 my-lg-0 homePageBannerSearch">
          <input className="form-control mr-sm-2 homePageBannerSearchBox" type="text" placeholder="Search" aria-label="Search"></input>
          <button className="btn btn-outline-success my-2 my-sm-0 homePageBannerSearchButton" type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default HomePage_Banner;