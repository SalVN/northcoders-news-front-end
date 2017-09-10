import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';
import ArticleList from './ArticleList';
import './css/TopicArticleList.css';

class TopicArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.voteHandlerTopicArticles = this.voteHandlerTopicArticles.bind(this);
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
    return (
      <div id='TopicArticleList' className='content'>
        <h2 className='page-title'><strong>{`${this.props.match.params.id[0].toUpperCase()}${this.props.match.params.id.slice(1)}`}</strong></h2>
        <ArticleList
          articles={this.props.topicArticles}
          voteArticle={this.voteHandlerTopicArticles}
        />
      </div>
    );
  }
  voteHandlerTopicArticles(vote, id) {
    this.props.voteArticle(vote, id);
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
    loading: state.topicArticles.loading
  };
}

TopicArticleList.propTypes = {
  topicArticles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchTopicArticles: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  voteArticle: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicArticleList);