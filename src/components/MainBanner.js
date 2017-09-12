import React from 'react';
// import PropTypes from 'prop-types';
import './css/MainBanner.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class MainBanner extends React.Component {
  render() {
    return (
      <section className='hero is-primary is-bold'>
        <div className='hero-body hero-css'>
          <div className='container'>
            <Link to='/'>
              <h1 className='title main-heading is-size-1 is-size-3-mobile'><strong>NORTHCODERS News</strong></h1>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

MainBanner.propTypes = {
};

export default MainBanner;