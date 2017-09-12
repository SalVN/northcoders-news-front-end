import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import './css/PageNotFound.css';

const PageNotFound = function (props) {
    return (
        <div className='card page-not-found-card'>
            <div className='card-image'>
                <img src='http://res.cloudinary.com/dl37xtqhv/image/upload/v1505237157/error-2129569_1920_wflvai.jpg'/>
            </div>
            <div className='card-content'>
                <div className='page-not-found-title'>Page Not Found</div>
                <div>That page does not exist</div>
                <Link to='/'><button className='button page-not-found-button'>Return to home page</button></Link>
            </div>
        </div>
    );
};

PageNotFound.propTypes = {

};

export default PageNotFound;