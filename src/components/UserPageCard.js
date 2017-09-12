import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/UserPageCard.css';

class UserPageCard extends Component {
    render() {
        return (
            <div className='card-box user-page-card-box'>
                <div className='container-fluid'>
                    <div className='card'>
                        <div className='user-page-card-background'>
                            <div className='columns'>
                                <div className='column is-one-quarter avatar-container'>
                                    <img className='user-card-avatar-page' src={this.props.user.avatar_url} />
                                </div>
                                <div className='column'>
                                    <p className='user-page-card-name'>{this.props.user.name}</p>
                                    <p className='user-page-card-username'>{`@${this.props.user.username}`}</p>
                                </div>
                            </div>
                        </div>
                        <div className='card-content content-container'>
                            <div className='columns'>
                                <div className='column is-2 is-mobile is-gapless'>
                                    <div className='user-page-card-mini-title'>Popularity</div>
                                    <div className='user-page-card-number'>{this.props.user.comments_vote_count + this.props.user.articles_vote_count}</div>
                                </div>
                                <div className='column is-2 is-mobile is-gapless'>
                                    <div className='user-page-card-mini-title'>Comments</div>
                                    <div className='user-page-card-number'>{this.props.user.comment_count}</div>
                                </div>
                                <div className='column is-2 is-mobile is-gapless'>
                                    <div className='user-page-card-mini-title'>Articles</div>
                                    <div className='user-page-card-number'>{this.props.articlesNo}</div>
                                </div>
                                <div className='column is-2 is-mobile is-gapless'>
                                    <div className='user-page-card-mini-title'>Comment Votes</div>
                                    <div className='user-page-card-number'>{this.props.user.comments_vote_count}</div>
                                </div>
                                <div className='column is-2 is-mobile is-gapless'>
                                    <div className='user-page-card-mini-title'>Article Votes</div>
                                    <div className='user-page-card-number'>{this.props.user.articles_vote_count}</div>
                                </div>
                                <div className='column is-2 is-mobile is-gapless'>
                                    <div className='user-page-card-mini-title'>Ranking</div>
                                    <div className='user-page-card-number'>{this.props.ranking}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserPageCard.propTypes = {
    user: PropTypes.object.isRequired,
    articlesNo: PropTypes.number.isRequired,
    ranking: PropTypes.number.isRequired
};

export default UserPageCard;