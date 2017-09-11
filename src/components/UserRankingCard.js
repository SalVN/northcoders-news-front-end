import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import './css/UserListCard.css';

const UserRankingCard = function (props) {
    return (
        <div className='container-fluid mini-card' key={props.user.username}>
            <div className='columns'>
                <div className='column is-1'>
                    <p className='user-list-card-number'><strong>{props.index + 1}</strong></p>
                </div>
                <div className='column is-two-thirds'>
                    <Link to={`/users/${props.user.username}`}>
                    <div>
                        <img className='user-list-image' src={`${props.user.avatar_url}`} />
                        <span className='user-list-username-text'>
                            {props.user.username}
                        </span>
                    </div>
                    </Link>
                </div>
                <div className='column is-3'>
                    <p className='user-list-card-ranking-number'>{props.user.articles_vote_count + props.user.comments_vote_count}</p>
                </div>
            </div>
        </div>
    );
};

UserRankingCard.propTypes = {
    user: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

export default UserRankingCard;