import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import './css/ArticleCard.css';

const ArticleCard = function (props) {
  return (
    <div className='box article-box-style'>
      <article className='media'>
        <div className='media-left article-number is-hidden-mobile'>
          {props.number + 1}
        </div>
        <div className='media-left is-hidden-mobile'>
          <button className='button is-black is-inverted is-small' onClick={props.voteHandler.bind(this, 'up', props.id)}><i className="fa fa-arrow-up" aria-hidden="true"></i></button>
          <p className='article-card-votes'><strong>{props.votes}</strong></p>
          <button className='button is-black is-inverted is-small' onClick={props.voteHandler.bind(this, 'down', props.id)}><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
        </div>
        <div className='media-content'>
          <div className='content'>
            <Link to={`/articles/${props.id}`}>
              <h3 className='title is-4 article-card-title'><strong>{props.title}</strong></h3>
            </Link>

            <div className='columns is-gapless is-desktop'>
              <div className='column is-narrow'>
                <span className='article-card-subheading-key'>added by:</span>
                {props.userData &&
                  <Link to={`/users/${props.userData.username}`}>
                    <img className='article-card-avatar' src={props.userData.avatar_url} alt='user avatar' />
                    <span className='article-card-subheading-value'>
                      <strong>{props.author}</strong>
                    </span>
                  </Link>
                }
              </div>
              <div className='column is-narrow'>
                <span>
                  <span className='article-card-subheading-key'>tags:</span>
                  <Link to={`/topics/${props.tags}/articles`}>
                    <span className='article-card-subheading-value'>
                      <strong>{props.tags}</strong>
                    </span>
                  </Link>
                </span>
                <span className='article-card-subheading-key'>comments:</span>
                <a href={`/articles/${props.id}#comments`}>
                  <span className='article-card-subheading-value'>
                    <strong>{props.comment_count}</strong>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div >
  );
};

ArticleCard.propTypes = {
  title: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  comment_count: PropTypes.number.isRequired,
  voteHandler: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired
};


export default ArticleCard;
