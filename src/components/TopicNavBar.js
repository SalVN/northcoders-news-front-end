import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';
import './css/TopicNavBar.css';
import { USERNAME } from '../../config';

export class TopicNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeBurger: false
        };
        this.toggleBurger = this.toggleBurger.bind(this);
    }
    componentDidMount() {
        this.props.fetchTopics();
        this.props.fetchUser(USERNAME);
    }
    render() {
        let activeBurger = (this.state.activeBurger) ? 'is-active' : '';
        return (
            <nav className='navbar navbar-css'>
                <div className='navbar-brand'>
                    <span className='navbar-item' >
                        <Link to='/'>
                            <img className='logo' src='https://avatars3.githubusercontent.com/u/6791502?v=3&s=200' alt='Northcoders logo' />
                        </Link>
                    </span>
                    <div onClick={this.toggleBurger} className={`navbar-burger ${activeBurger} burger`}>
                        <div className="navbar-burger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div className={`navbar-menu ${activeBurger}`}>
                    <div className='navbar-start'>
                        {
                            this.props.topicsLoading &&
                            <div className='navbar-item article-list-loading-icon'>
                                <span>
                                    <i className='fa fa-refresh fa-spin' />
                                </span>
                            </div>
                        }
                        {
                            this.props.topics &&
                            this.props.topics.map((topic) => {
                                return (
                                    <span key={topic._id} className='navbar-item'>
                                        <NavLink onClick={this.toggleBurger} className='navbar-text-css' to={`/topics/${topic.slug}/articles`}>
                                            <span><strong>{`< ${topic.title.toUpperCase()} />`}</strong></span>
                                        </NavLink>
                                    </span>
                                );
                            })}
                    </div>
                    <div className='navbar-end'>
                        <span className='navbar-item'>
                            {
                                this.props.userLoading &&
                                                           <div className='navbar-item article-list-loading-icon'>
                                <span>
                                    <i className='fa fa-refresh fa-spin' />
                                </span>
                            </div> 
                            }
                            {
                                this.props.user && !this.props.userLoading &&
                                <Link className='user' to={`/users/${this.props.user.username}`}>
                                    <span><img className='avatar' src={`${this.props.user.avatar_url}`} /></span>
                                    <span className='navbar-user-text'><strong>{this.props.user.username}</strong></span>
                                </Link>
                            }
                        </span>
                    </div>
                </div>
            </nav >
        );
    }
    toggleBurger() {
        this.setState({
            activeBurger: !this.state.activeBurger
        });
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTopics: () => {
            dispatch(actions.fetchTopics());
        },
        fetchUser: (username) => {
            dispatch(actions.fetchOneUser(username));
        }
    };
}

function mapStateToProps(state) {
    return {
        topics: state.topics.topics,
        topicsLoading: state.topics.loading,
        userLoading: state.oneUser.loading,
        user: state.oneUser.user
    };
}

TopicNavBar.propTypes = {
    topics: PropTypes.array.isRequired,
    topicsLoading: PropTypes.bool.isRequired,
    userLoading: PropTypes.bool.isRequired,
    fetchTopics: PropTypes.func.isRequired,
    fetchUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicNavBar);