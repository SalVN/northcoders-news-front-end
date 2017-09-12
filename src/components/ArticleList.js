import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';
import { sortArticles } from '../utilities/sortArticles';

import ArticleCard from './ArticleCard';
import './css/ArticleList.css';

class ArticleList extends React.Component {
  componentDidMount() {
    if (this.props.users && this.props.users.length < 1) {
      this.props.fetchUsers();
    }
  }
  render() {
    const users = this.props.users;
    const voteHandler = this.props.voteArticle;
    if (this.props.sortBy) {
      sortArticles(this.props.articles, this.props.sortBy);
    }
    const articlesToRender = this.props.articles.slice(0, this.props.maximum);
    return (
      <div id='ArticleList' className='content'>
        {
          this.props.usersLoading &&
          <span>
            <i className='fa fa-refresh fa-spin'/>
          </span>
        }
        {this.props.articles.length > 0 &&
          articlesToRender.map((article, i) => {
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
                voteHandler={voteHandler}
                userData={users[index]}
              />
            );
          })
        }
        {this.props.maximum <= this.props.articles.length &&
          <div className='show-more-button-div'>
            <button className='button is-small show-more-button' onClick={this.props.viewMoreArticles}>Show more</button>
          </div>
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: () => {
      dispatch(actions.fetchUsers());
    }
  };
}

function mapStateToProps(state) {
  return {
    usersLoading: state.users.loading,
    users: state.users.users
  };
}

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
  usersLoading: PropTypes.bool.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  voteArticle: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  sortBy: PropTypes.string.isRequired,
  maximum: PropTypes.number.isRequired,
  viewMoreArticles: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);