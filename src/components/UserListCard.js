import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';
import { sortUsers } from '../utilities/sortUsers';

import UserRankingCard from './UserRankingCard';
import './css/UserListCard.css';

class UserListCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: false,
            sortBy: 'Sort by ranking'
        };
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.sortUserList = this.sortUserList.bind(this);
    }
    componentDidMount() {
        if (this.props.users && this.props.users.length < 1) {
            this.props.fetchUsers();
        }
    }
    render() {
        if (this.props.users && this.props.users.length > 0) {
            sortUsers(this.props.users, this.state.sortBy);
        }
        let activeDropdown = this.state.showDropdown ? 'is-active' : '';
        let rankingActive = this.state.sortBy === 'Sort by ranking' ? 'is-active' : '';
        let commentsActive = this.state.sortBy === 'Sort by comments' ? 'is-active' : '';
        let commentVotesActive = this.state.sortBy === 'Sort by comment votes' ? 'is-active' : '';
        let articleVotesActive = this.state.sortBy === 'Sort by article votes' ? 'is-active' : '';
        return (
            <div className='card-box'>
                <div className='container-fluid'>
                    <div className='card'>
                        <header className='card-header'>
                            <div className='card-header-style'>
                                <div className='card-header-title'>
                                    <div className={`dropdown ${activeDropdown}`}>
                                        <div className="dropdown-trigger">
                                            <button onClick={this.toggleDropdown} className="button is-small is-primary is-inverted is-outlined dropdown-button" aria-haspopup="true" aria-controls="dropdown-menu">
                                                <span className="icon">
                                                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                                                </span>
                                            </button>
                                        </div>
                                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                            <div className="dropdown-content">
                                                <a onClick={this.sortUserList} className={`dropdown-item ${rankingActive}`}>
                                                    Sort by ranking
                                                </a>
                                                <a onClick={this.sortUserList} className={`dropdown-item ${commentsActive}`}>
                                                    Sort by comments
                                                </a>
                                                <a onClick={this.sortUserList} className={`dropdown-item ${commentVotesActive}`}>
                                                    Sort by comment votes
                                                </a>
                                                <a onClick={this.sortUserList} className={`dropdown-item ${articleVotesActive}`}>
                                                    Sort by article votes
                                                </a>
                                                <a onClick={this.toggleDropdown} className="dropdown-item cancel">
                                                    Close
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <span>User Ranking</span>
                                </div>
                            </div>
                        </header>
                        <div className='card-content'>
                            {
                                this.props.usersLoading &&
                                <div className='article-list-loading-icon'>
                                    <span>
                                        <i className='fa fa-refresh fa-spin' />
                                    </span>
                                </div>
                            }
                            {
                                this.props.users &&
                                this.props.users.map((user, i) => {
                                    return (
                                        <UserRankingCard key={user.username} user={user} criteria={this.state.sortBy} index={i} />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    toggleDropdown() {
        this.setState({
            showDropdown: !this.state.showDropdown
        });
    }
    sortUserList(e) {
        e.preventDefault();
        this.setState({
            showDropdown: false,
            sortBy: e.target.innerText
        });
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
        users: state.users.users,
        usersLoading: state.users.loading
    };
}

UserListCard.propTypes = {
    users: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    usersLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListCard);