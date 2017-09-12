import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import './css/PageNotFound.css';

const UserNotFound = function () {
    return (
        <div className='card page-not-found-card'>
            <div className='card-image'>
                <img src='http://res.cloudinary.com/dl37xtqhv/image/upload/v1505237987/woman-565104_1920_amcmvg.jpg'/>
            </div>
            <div className='card-content'>
                <div className='page-not-found-title'>User Not Found</div>
                <div>That user does not exist</div>
                <Link to='/'><button className='button page-not-found-button'>Return to home page</button></Link>
            </div>
        </div>
    );
};

export default UserNotFound;