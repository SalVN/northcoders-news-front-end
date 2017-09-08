import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';
import './css/UserCard.css';
import { USERNAME } from '../../config';

class UserCard extends Component {
    componentDidMount() {
        if (!this.props.user.username) {
            this.props.fetchUser(USERNAME);
        }
    }
    render() {
        return (
            <div className='card-box'>
                <div className='card'>
                    <div className='background'>
                        <img className='user-card-avatar' src={this.props.user.avatar_url}/>
                    </div>
                    <div className='card-content'>
                        <div>
                            <p className='user-card-name'>{this.props.user.name}</p>
                            <p className='user-card-username'>{`@${this.props.user.username}`}</p>
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
    fetchUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);