import React from 'react';
import ArticleCard from './ArticleCard';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import * as actions from '../actions/actions';

class ArticleList extends React.Component {
  componentDidMount () {
    this.props.fetchArticles();
  }
  render () {
    return (
      <div id='ArticleList'>
        { this.props.articles.length > 0 &&
          this.props.articles.map(article => <ArticleCard title={article.title} votes={article.votes} key={article.title} />)}
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

function mapStateToProps (state) {
  console.log(state);
  return {
    articles: state.articles,
    loading: state.loading
  };
}

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchArticles: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);