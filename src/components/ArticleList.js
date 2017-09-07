import React from 'react';
import ArticleCard from './ArticleCard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.voteHandler = this.voteHandler.bind(this);
  }
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
                voteHandler={this.voteHandler}
              />
            );
          })
        }
      </div>
    );
  }
  voteHandler(vote, id) {
    console.log(vote, id);
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