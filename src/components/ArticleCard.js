import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const ArticleCard = function (props) {
  return (
    <div className='box'>
      <article className='media'>
        <div className='media-left'>
          {props.number + 1}
        </div>
        <div className='media-left'>
          <button><i className="fa fa-arrow-up" aria-hidden="true"></i></button>
          <div>{props.votes}</div>
          <button><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
        </div>
        <div className='media-content'>
          <div className='content'>
            <Link to='#'>
              <h3 className='title is-3'>{props.title}</h3>
            </Link>
            <p>
              <span>added by: {props.author}</span>
              <span>tags: {props.tags}</span>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

ArticleCard.propTypes = {
  title: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired
};


export default ArticleCard;
