import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';

import ArticleList from './ArticleList';
import ArticleListHeader from './ArticleListHeader';
import './css/MainArticleList.css';

class MainArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: 'votes',
            showDropdown: false,
            maximum: 10,
            voted: false
        };
        this.voteHandlerMainArticles = this.voteHandlerMainArticles.bind(this);
        this.handleClickSelect = this.handleClickSelect.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.viewMoreArticles = this.viewMoreArticles.bind(this);
    }
    componentDidMount() {
        if (this.props.articles && this.props.articles.length < 1) {
            this.props.fetchArticles();
        }
    }
    componentWillReceiveProps() {
        if (this.state.voted) {
            this.props.fetchUsers();
            this.setState({ voted: false });
        }
    }
    render() {
        return (
            <div id='ArticleList' className='content'>
                <ArticleListHeader
                    title={'Articles'}
                    handleClickSelect={this.handleClickSelect}
                    toggleDropdown={this.toggleDropdown}
                    showDropdown={this.state.showDropdown}
                />
                {
                    this.props.articlesLoading
                        ? <div className='article-list-loading-icon'>
                            <span>
                                <i className='fa fa-refresh fa-spin' />
                            </span>
                        </div>
                        : <ArticleList
                            articles={this.props.articles}
                            voteArticle={this.voteHandlerMainArticles}
                            sortBy={this.state.sortBy}
                            maximum={this.state.maximum}
                            viewMoreArticles={this.viewMoreArticles}
                        />
                }
            </div>
        );
    }
    voteHandlerMainArticles(vote, id) {
        this.props.voteArticle(vote, id);
        this.setState({
            voted: true
        });
    }
    handleClickSelect(e) {
        e.preventDefault();
        this.setState({
            sortBy: e.target.attributes[0].value,
            showDropdown: false
        });
    }
    toggleDropdown() {
        this.setState({
            showDropdown: !this.state.showDropdown
        });
    }
    viewMoreArticles() {
        const newMax = this.state.maximum + 10;
        this.setState({
            maximum: newMax
        });
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchArticles: () => {
            dispatch(actions.fetchArticles());
        },
        voteArticle: (vote, id) => {
            dispatch(actions.voteArticle(vote, id));
        },
        fetchUsers: () => {
            dispatch(actions.fetchUsers());
        }
    };
}

function mapStateToProps(state) {
    return {
        articles: state.articles.articles,
        articlesLoading: state.articles.loading,
    };
}

MainArticleList.propTypes = {
    articles: PropTypes.array.isRequired,
    articlesLoading: PropTypes.bool.isRequired,
    fetchArticles: PropTypes.func.isRequired,
    voteArticle: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MainArticleList);