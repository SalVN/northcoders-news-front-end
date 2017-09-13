import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';

import './css/UsersPage.css';
import UsersCard from './UsersCard';

export class UsersPage extends Component {
    componentDidMount() {
        if (this.props.users && this.props.users.length < 1) {
            this.props.fetchUsers();
        }
    }
    render() {
        return (
            <div>
                <h2 className='users-page-header'><strong>Users</strong></h2>
                <div className='container-fluid'>
                    {this.props.users &&
                        this.props.users.map((user) => {
                            return (
                                <UsersCard key={user.username} user={user} />
                            );
                        })
                    }
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

UsersPage.propTypes = {
    users: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);