import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './css/ArticlePage.css';
import Article from './Article';
import Comments from './Comments';
import * as actions from '../actions/actions';

class ArticlePage extends Component {
    componentDidMount() {
        if (this.props.articles && this.props.articles.length < 1) {
            this.props.fetchArticles();
        }
        if (this.props.users && this.props.users.length < 1) {
            this.props.fetchUsers();
        }
    }
    render() {
        let article;
        let user;
        if (this.props.articles) {
            article = this.props.articles.reduce((acc, article) => {
                if (article._id === this.props.match.params.id) acc = article;
                return acc;
            }, {});
        }
        if (this.props.users && article) {
            user = this.props.users.reduce((acc, user) => {
                if (article.created_by === user.username) acc = user;
                return acc;
            }, {});
        }
        return (
            <div className='article-page'>
                <Article
                    article={article}
                    user={user}
                />
                <hr className='article-page-hr' />
                <Comments
                    commentCount={article.comment_count}
                    id={this.props.match.params.id}
                    users={this.props.users}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchArticles: () => {
            dispatch(actions.fetchArticles());
        },
        fetchUsers: () => {
            dispatch(actions.fetchUsers());
        }
    };
}

function mapStateToProps(state) {
    return {
        articles: state.articles.articles,
        loading: state.loading,
        users: state.users.users
    };
}

ArticlePage.propTypes = {
    articles: PropTypes.array.isRequired,
    fetchArticles: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);