import React from 'react';
import ArticleCard from './ArticleCard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';

class TopicArticleList extends React.Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
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
              />
            );
          })
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTopicArticles: (id) => {
      dispatch(actions.fetchTopicArticles(id));
    }
  };
}

function mapStateToProps(state) {
  console.log(state);
  return {
    topicArticles: state.topicArticles.topicArticles,
    loading: state.topicArticles.loading
  };
}

TopicArticleList.propTypes = {
  topicArticles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchTopicArticles: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicArticleList);