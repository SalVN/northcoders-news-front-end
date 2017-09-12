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
      maximum: 10
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
  }
  componentDidMount() {
    this.props.fetchTopicArticles(this.props.match.params.id);
  }
  render() {
    let topicNotFound = false;
    if (this.props.error && this.props.error.response.status === 404) {
      topicNotFound = true;
    }
    return (
      <div id='TopicArticleList' className='content'>
        {
          topicNotFound &&
          <Redirect to='/not-found' />
        }
        <ArticleListHeader
          title={`${this.props.match.params.id[0].toUpperCase()}${this.props.match.params.id.slice(1)}`}
          handleClickSelect={this.handleClickSelect}
          toggleDropdown={this.toggleDropdown}
          showDropdown={this.state.showDropdown}
        />
        <ArticleList
          articles={this.props.topicArticles}
          voteArticle={this.voteHandlerTopicArticles}
          sortBy={this.state.sortBy}
          maximum={this.state.maximum}
          viewMoreArticles={this.viewMoreArticles}
        />
      </div>
    );
  }
  voteHandlerTopicArticles(vote, id) {
    this.props.voteArticle(vote, id);
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
    }
  };
}

function mapStateToProps(state) {
  return {
    topicArticles: state.topicArticles.topicArticles,
    loading: state.topicArticles.loading,
    error: state.topicArticles.error
  };
}

TopicArticleList.propTypes = {
  topicArticles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchTopicArticles: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  voteArticle: PropTypes.func.isRequired,
  error: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicArticleList);