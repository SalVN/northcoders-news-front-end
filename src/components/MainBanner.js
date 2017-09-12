import React from 'react';
import './css/MainBanner.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const MainBanner = function () {
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
};

export default MainBanner;