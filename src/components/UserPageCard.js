import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/UserPageCard.css';

const UserPageCard = function (props) {
        return (
            <div className='user-page-card-box'>
                <div className='container-fluid'>
                    <div className='card'>
                        <div className='user-page-card-background'>
                            <div className='columns is-mobile'>
                                <div className='column is-half-mobile is-one-quarter-tablet avatar-container'>
                                    <img className='user-card-avatar-page' src={props.user.avatar_url} />
                                </div>
                                <div className='column is-half-mobile is-three-quarters-tablet'>
                                    <p className='user-page-card-name'>{props.user.name}</p>
                                    <p className='user-page-card-username'>{`@${props.user.username}`}</p>
                                </div>
                            </div>
                        </div>
                        <div className='card-content content-container'>
                            <div className='columns is-mobile'>
                                <div className='column is-2-tablet'>
                                    <div className='user-page-card-mini-title'>Popularity</div>
                                    <div className='user-page-card-number'>{props.user.comments_vote_count + props.user.articles_vote_count}</div>
                                </div>
                                <div className='column is-2-tablet'>
                                    <div className='user-page-card-mini-title'>Comments</div>
                                    <div className='user-page-card-number'>{props.user.comment_count}</div>
                                </div>
                                <div className='column is-2-tablet'>
                                    <div className='user-page-card-mini-title'>Articles</div>
                                    <div className='user-page-card-number'>{props.articlesNo}</div>
                                </div>
                                <div className='column is-2-tablet is-hidden-mobile'>
                                    <div className='user-page-card-mini-title'>Comment Votes</div>
                                    <div className='user-page-card-number'>{props.user.comments_vote_count}</div>
                                </div>
                                <div className='column is-2-tablet is-hidden-mobile'>
                                    <div className='user-page-card-mini-title'>Article Votes</div>
                                    <div className='user-page-card-number'>{props.user.articles_vote_count}</div>
                                </div>
                                <div className='column is-2-tablet is-hidden-mobile'>
                                    <div className='user-page-card-mini-title'>Ranking</div>
                                    <div className='user-page-card-number'>{props.ranking}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
};

UserPageCard.propTypes = {
    user: PropTypes.object.isRequired,
    articlesNo: PropTypes.number.isRequired,
    ranking: PropTypes.number.isRequired
};

export default UserPageCard;