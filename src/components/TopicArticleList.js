import React from 'react';
import ArticleCard from './ArticleCard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';

class TopicArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.voteHandler = this.voteHandler.bind(this);
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
      <div id='TopicArticleList'>
        {this.props.topicArticles.length > 0 &&
          this.props.topicArticles.map((topicArticle, i) => {
            return (
              <ArticleCard
                key={topicArticle._id}
                title={topicArticle.title}
                number={i}
                votes={topicArticle.votes}
                author={topicArticle.created_by}
                id={topicArticle._id}
                tags={topicArticle.belongs_to}
                comment_count={topicArticle.comment_count}
                voteHandler={this.voteHandler}
              />
            );
          })
        }
      </div>
    );
  }
  voteHandler(vote, id) {
    this.props.voteTopicArticle(vote, id);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTopicArticles: (id) => {
      dispatch(actions.fetchTopicArticles(id));
    },
    voteTopicArticle: (vote, id) => {
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