import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

import * as actions from '../actions/actions';

import ArticleList from './ArticleList';
import ArticleListHeader from './ArticleListHeader';
import './css/TopicArticleList.css';

class TopicArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: 'votes',
            showDropdown: false,
            maximum: 10,
            voted: false
        };
        this.voteHandlerTopicArticles = this.voteHandlerTopicArticles.bind(this);
        this.handleClickSelect = this.handleClickSelect.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.viewMoreArticles = this.viewMoreArticles.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            nextProps.fetchTopicArticles(nextProps.match.params.id);
        }
        if (this.state.voted) {
            this.props.fetchUsers();
            this.setState({ voted: false });
        }
    }
    componentDidMount() {
        this.props.fetchTopicArticles(this.props.match.params.id);
    }
    render() {
        let topicFound = false;
        if (this.props.error && this.props.error.response.status === 404) {
            topicFound = true;
            this.props.topics.forEach(topic => {
                if (topic.slug === this.props.match.params.id) topicFound = false;
            });
        }
        return (
            <div id='TopicArticleList' className='content'>
                {
                    topicFound &&
                    <Redirect to='/not-found' />
                }
                <ArticleListHeader
                    title={`${this.props.match.params.id[0].toUpperCase()}${this.props.match.params.id.slice(1)}`}
                    handleClickSelect={this.handleClickSelect}
                    toggleDropdown={this.toggleDropdown}
                    showDropdown={this.state.showDropdown}
                />
                {this.props.articlesLoading
                    ? <div className='article-list-loading-icon'>
                        <span>
                            <i className='fa fa-refresh fa-spin' />
                        </span>
                    </div>
                    :
                    <ArticleList
                        articles={this.props.topicArticles}
                        voteArticle={this.voteHandlerTopicArticles}
                        sortBy={this.state.sortBy}
                        maximum={this.state.maximum}
                        viewMoreArticles={this.viewMoreArticles}
                    />
                }
            </div>
        );
    }
    voteHandlerTopicArticles(vote, id) {
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
        fetchTopicArticles: (id) => {
            dispatch(actions.fetchTopicArticles(id));
        },
        voteArticle: (vote, id) => {
            dispatch(actions.voteTopicArticle(vote, id));
        },
        fetchUsers: () => {
            dispatch(actions.fetchUsers());
        }

    };
}

function mapStateToProps(state) {
    return {
        topicArticles: state.topicArticles.topicArticles,
        articlesLoading: state.topicArticles.loading,
        error: state.topicArticles.error,
        topics: state.topics.topics
    };
}

TopicArticleList.propTypes = {
    topicArticles: PropTypes.array.isRequired,
    articlesLoading: PropTypes.bool.isRequired,
    fetchTopicArticles: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    voteArticle: PropTypes.func.isRequired,
    error: PropTypes.object,
    topics: PropTypes.any.isRequired,
    fetchUsers: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicArticleList);