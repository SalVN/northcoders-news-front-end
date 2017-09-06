import React from 'react';
// import PropTypes from 'prop-types';
import './css/MainBanner.css';

class MainBanner extends React.Component {
  render () {
    return (
      <section className='hero is-primary is-bold'>
          <div className='hero-body hero-css'>
              <div className='container'>
                  <h1 className='title main-heading'><strong>NORTHCODERS News</strong></h1>
                </div>
              </div>
      </section>
    );
  }
}

MainBanner.propTypes = {
};

export default MainBanner;