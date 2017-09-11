import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';
import './css/UserListCard.css';
import { USERNAME } from '../../config';
import UserRankingCard from './UserRankingCard';

class UserListCard extends Component {
    componentDidMount() {
        if (this.props.users && this.props.users.length < 1) {
            this.props.fetchUsers();
        }
    }
    render() {
        if (this.props.users && this.props.users.length > 0) {
            this.props.users.sort((a, b) => {
                return (b.articles_vote_count + b.comments_vote_count) - (a.articles_vote_count + a.comments_vote_count);
            });
        }
        return (
            <div className='card-box'>
                <div className='container-fluid'>
                    <div className='card'>
                        <header className='card-header'>
                            <div className='card-header-style'>
                                <p className='card-header-title'>User Ranking</p>
                            </div>
                        </header>
                        <div className='card-content'>
                            {this.props.users &&
                                this.props.users.map((user, i) => {
                                    return (
                                        <UserRankingCard user={user} index={i}/>
                                    );
                                })
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
        fetchUsers: () => {
            dispatch(actions.fetchUsers());
        }
    };
}

function mapStateToProps(state) {
    return {
        users: state.users.users
    };
}

UserListCard.propTypes = {
    users: PropTypes.object.isRequired,
    fetchUsers: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListCard);