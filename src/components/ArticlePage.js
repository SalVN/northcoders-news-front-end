import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

import * as actions from '../actions/actions';
import { getIndex } from '../utilities/getIndex';

import Article from './Article';
import Comments from './Comments';
import './css/ArticlePage.css';

class ArticlePage extends Component {
    constructor(props) {
        super(props);
        this.articleVoteHandler = this.articleVoteHandler.bind(this);
    }
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
        let articleNotFound = false;
        if (this.props.articles) {
            article = this.props.articles.reduce((acc, article) => {
                if (article._id === this.props.match.params.id) acc = article;
                return acc;
            }, {});
            if (this.props.articles.length > 0 && article && !article._id) {
                articleNotFound = true;
            }
        }
        if (this.props.users && article) {
            user = this.props.users.reduce((acc, user) => {
                if (article.created_by === user.username) acc = user;
                return acc;
            }, {});
        }
        const index = getIndex(this.props.articles, article._id);
        return (
            <div className='article-page'>
                {articleNotFound &&
                    <Redirect to='/not-found' />
                }
                {
                    this.props.articlesLoading
                        ? <span>
                            <i className='fa fa-refresh fa-spin' />
                        </span>
                        : <Article
                            article={article}
                            user={user}
                            voteArticle={this.articleVoteHandler}
                            index={index}
                            articles={this.props.articles}
                        />
                }
                <hr className='article-page-hr' />
                <Comments
                    id={this.props.match.params.id}
                    users={this.props.users}
                />
            </div>
        );
    }
    articleVoteHandler(vote, id) {
        this.props.voteArticle(vote, id);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchArticles: () => {
            dispatch(actions.fetchArticles());
        },
        fetchUsers: () => {
            dispatch(actions.fetchUsers());
        },
        voteArticle: (vote, id) => {
            dispatch(actions.voteArticle(vote, id));
        }
    };
}

function mapStateToProps(state) {
    return {
        articles: state.articles.articles,
        articlesLoading: state.articles.loading,
        users: state.users.users
    };
}

ArticlePage.propTypes = {
    articles: PropTypes.array.isRequired,
    fetchArticles: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    voteArticle: PropTypes.func.isRequired,
    articlesLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);