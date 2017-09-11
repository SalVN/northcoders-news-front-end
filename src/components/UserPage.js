import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';
import { getIndexUsername } from '../utilities/getIndex';

import UserPageCard from './UserPageCard';
import { returnFilteredArticles } from '../utilities/filterArticles';
import './css/UserPage.css';

class UserPage extends Component {
    componentDidMount() {
        if (this.props.users && this.props.users.length < 1) {
            this.props.fetchUsers();
        }
        if (this.props.users && this.props.users.length < 1) {
            this.props.fetchArticles();
        }
    }
    render() {
        let index;
        let userArticles;
        if (this.props.users && this.props.users.length > 0) {
            this.props.users.sort((a, b) => {
                return (b.articles_vote_count + b.comments_vote_count) - (a.articles_vote_count + a.comments_vote_count);
            });
            index = getIndexUsername(this.props.users, this.props.match.params.id);
            userArticles = returnFilteredArticles(this.props.articles, this.props.users[index].username);
        }

        return (
            <div>
                {((this.props.users && this.props.users.length > 0) && (this.props.articles && this.props.articles.length > 0)) &&
                    <UserPageCard articlesNo={userArticles.length} ranking={index + 1} user={this.props.users[index]} />
                }
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsers: () => {
            dispatch(actions.fetchUsers());
        },
        fetchArticles: () => {
            dispatch(actions.fetchArticles());
        }
    };
}

function mapStateToProps(state) {
    return {
        users: state.users.users,
        articles: state.articles.articles
    };
}


UserPage.propTypes = {
    users: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    fetchArticles: PropTypes.func.isRequired,
    articles: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);