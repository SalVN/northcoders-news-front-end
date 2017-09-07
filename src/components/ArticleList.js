import React from 'react';
import ArticleCard from './ArticleCard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';

class ArticleList extends React.Component {
  componentDidMount() {
    this.props.fetchArticles();
  }
  render() {
    return (
      <div id='ArticleList'>
        {this.props.articles.length > 0 &&
          this.props.articles.map((article, i) => {
            return (
              <ArticleCard
                key={article._id}
                title={article.title}
                number={i}
                votes={article.votes}
                author={article.created_by}
                id={article._id}
                tags={article.belongs_to}
                comment_count={article.comment_count}
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
    fetchArticles: () => {
      dispatch(actions.fetchArticles());
    }
  };
}

function mapStateToProps(state) {
  return {
    articles: state.articles.articles,
    loading: state.articles.loading
  };
}

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchArticles: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);