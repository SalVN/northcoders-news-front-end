import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';
import ArticleList from './ArticleList';

class TopicArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.voteHandlerTopicArticles = this.voteHandlerTopicArticles.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.match.params.id)
    if (nextProps.match.params.id !== this.props.match.params.id) {
      nextProps.fetchTopicArticles(nextProps.match.params.id);
    }
  }
  componentDidMount() {
      this.props.fetchTopicArticles(this.props.match.params.id);
  }
  render() {
    return (
      <div id='TopicArticleList'>
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
  voteTopicArticle: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicArticleList);