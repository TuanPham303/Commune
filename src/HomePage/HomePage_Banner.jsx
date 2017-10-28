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
            <form>
              <input className="form-control homePageBannerSearchBox" type="text" placeholder="Press enter to search" aria-label="Search"></input>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage_Banner;