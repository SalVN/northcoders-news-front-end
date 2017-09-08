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
    if (this.props.articles && this.props.articles.length < 1) {
      this.props.fetchArticles();
      if (this.props.users && this.props.users.length < 1) {
        this.props.fetchUsers();
      }
    }
  }
  render() {
    const users = this.props.users;
    return (
      <div id='ArticleList'>
        {this.props.articles.length > 0 &&
          this.props.articles.map((article, i) => {
            const username = article.created_by;
            let index;
            users &&
              users.forEach((user, i) => {
                if (user.username === username) index = i;
              });
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
                userData={users[index]}
              />
            );
          })
        }
      </div>
    );
  }
  voteHandler(vote, id) {
    this.props.voteArticle(vote, id);
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
    loading: state.articles.loading,
    users: state.users.users
  };
}

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  voteArticle: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);