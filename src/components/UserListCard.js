import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';
import { sortUsers } from '../utilities/sortUsers';

import './css/UserListCard.css';
import UserRankingCard from './UserRankingCard';

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
        return (
            <div className='card-box'>
                <div className='container-fluid'>
                    <div className='card'>
                        <header className='card-header'>
                            <div className='card-header-style'>
                                <p className='card-header-title'>
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
                                                <a onClick={this.sortUserList} className="dropdown-item">
                                                    Sort by ranking
                                                </a>
                                                <a onClick={this.sortUserList} className="dropdown-item">
                                                    Sort by comments
                                                </a>
                                                <a onClick={this.sortUserList} className="dropdown-item">
                                                    Sort by comment votes
                                                </a>
                                                <a onClick={this.sortUserList} className="dropdown-item">
                                                    Sort by article votes
                                                </a>
                                                <a onClick={this.toggleDropdown} className="dropdown-item cancel">
                                                    Close
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <span>User Ranking</span>
                                </p>
                            </div>
                        </header>
                        <div className='card-content'>
                            {this.props.users &&
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
        console.dir(e.target.innerText);
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
        users: state.users.users
    };
}

UserListCard.propTypes = {
    users: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListCard);