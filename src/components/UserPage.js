import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';
import { getIndexUsername } from '../utilities/getIndex';

import UserPageCard from './UserPageCard';
import ArticleListHeader from './ArticleListHeader';
import ArticleList from './ArticleList';

import { returnFilteredArticles } from '../utilities/filterArticles';
import './css/UserPage.css';

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articlesSortBy: 'votes',
            articlesMaximum: 2,
            showDropdown: false
        };
        this.voteHandlerMainArticles = this.voteHandlerMainArticles.bind(this);
        this.handleClickSelectArticles = this.handleClickSelectArticles.bind(this);
        this.increaseArticlesMax = this.increaseArticlesMax.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }
    componentDidMount() {
        if (!this.props.users || this.props.users.length < 1) {
            this.props.fetchUsers();
        }
        if (!this.props.articles || this.props.articles.length < 1) {
            this.props.fetchArticles();
        }
    }
    render() {
        let index;
        let userArticles = [];
        if (this.props.users && this.props.users.length > 0) {
            this.props.users.sort((a, b) => {
                return (b.articles_vote_count + b.comments_vote_count) - (a.articles_vote_count + a.comments_vote_count);
            });
            index = getIndexUsername(this.props.users, this.props.match.params.id);
            userArticles = returnFilteredArticles(this.props.articles, this.props.users[index].username);
        }
        let disableViewMoreArticles = this.state.articlesMaximum >= userArticles.length
            ? 'disabled'
            : '';
        let nameUser = this.props.users && index
            ? `${this.props.users[index].username}'s`
            : '';
        return (
            <div>
                {((this.props.users && this.props.users.length > 0) && (this.props.articles && this.props.articles.length > 0)) &&
                    <UserPageCard articlesNo={userArticles.length} ranking={index + 1} user={this.props.users[index]} />
                }
                <hr />
                <div id='Articles' className='content'>
                    <ArticleListHeader
                        title={`${nameUser} Articles`}
                        handleClickSelect={this.handleClickSelectArticles}
                        toggleDropdown={this.toggleDropdown}
                        showDropdown={this.state.showDropdown}
                    />
                    {
                        userArticles && userArticles.length > 0
                            ? <ArticleList
                                articles={userArticles.slice(0, this.state.articlesMaximum)}
                                voteArticle={this.voteHandlerMainArticles}
                                sortBy={this.state.articlesSortBy}
                            />
                            : <p>This user hasn't uploaded any articles yet</p>
                    }
                    <div className='button-div'>
                        <button onClick={this.increaseArticlesMax} className={`button is-small view-more-button ${disableViewMoreArticles}`}>View More</button>
                    </div>
                </div>
                <hr />
            </div>
        );
    }
    voteHandlerMainArticles(vote, id) {
        this.props.voteArticle(vote, id);
    }
    handleClickSelectArticles(e) {
        e.preventDefault();
        this.setState({
            articlesSortBy: e.target.attributes[0].value,
            showDropdown: false
        });
    }
    increaseArticlesMax() {
        const newMax = this.state.articlesMaximum + 4;
        this.setState({
            articlesMaximum: newMax
        });
    }
    toggleDropdown() {
        this.setState({
            showDropdown: !this.state.showDropdown
        });
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsers: () => {
            dispatch(actions.fetchUsers());
        },
        fetchArticles: () => {
            dispatch(actions.fetchArticles());
        },
        voteArticle: (vote, id) => {
            dispatch(actions.voteArticle(vote, id));
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
    articles: PropTypes.array.isRequired,
    voteArticle: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);