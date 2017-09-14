import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import * as actions from '../actions/actions';
import { USERNAME } from '../../config';

import './css/UserCard.css';

export class UserCard extends Component {
    componentDidMount() {
        if (!this.props.user.username) {
            this.props.fetchUser(USERNAME);
        }
    }
    render() {
        return (
            <div className='card-box'>
                <div className='container-fluid'>
                    <div className='card'>
                        <div className='background'>
                            <img className='user-card-avatar' src={this.props.user.avatar_url} />
                        </div>
                        <div className='card-content'>
                            {
                                this.props.userLoading
                                    ? <div className='article-list-loading-icon'>
                                        <span>
                                            <i className='fa fa-refresh fa-spin' />
                                        </span>
                                    </div>

                                    : <div>
                                        <Link to={`/users/${this.props.user.username}`}>
                                            <div>
                                                <p className='user-card-name'><strong>{this.props.user.name}</strong></p>
                                                <p className='user-card-username'>{`@${this.props.user.username}`}</p>
                                            </div>
                                        </Link>
                                        <div className='columns'>
                                            <div className='column is-half'>
                                                <div className='user-card-mini-title'>Comments</div>
                                                <div className='user-card-number'>{this.props.user.comment_count}</div>
                                            </div>
                                            <div className='column is-half'>
                                                <div className='user-card-mini-title'>Popularity</div>
                                                <div className='user-card-number total-vote'>{this.props.user.comments_vote_count + this.props.user.articles_vote_count}</div>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUser: (username) => {
            dispatch(actions.fetchOneUser(username));
        }
    };
}

function mapStateToProps(state) {
    return {
        userLoading: state.oneUser.loading,
        user: state.oneUser.user
    };
}

UserCard.propTypes = {
    user: PropTypes.object.isRequired,
    fetchUser: PropTypes.func.isRequired,
    userLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);