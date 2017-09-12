import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import './css/UsersCard.css';

const UsersCard = function (props) {
    return (
        <div className='card users-box-style' key={props.user.username}>
                <div className='column is-two-thirds'>
                    <Link to={`/users/${props.user.username}`}>
                        <div>
                            <img className='users-list-image' src={`${props.user.avatar_url}`} />
                            <span className='users-list-username-text'>
                                {props.user.username}
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
    );
};

UsersCard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default UsersCard;