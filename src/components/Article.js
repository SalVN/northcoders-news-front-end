import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Article = function (props) {
    return (
        <div className='box'>
            <div className='columns'>
            <div>{props.article.votes}</div>
            <div>{props.article.title}</div>
            <div>{props.article.created_by}</div>
            <div>{props.article.commentCount}</div>
            <div>{props.article.belongs_to}</div>
            <div>{props.article.body}</div>
            </div>
        </div>
    );
};

Article.propTypes = {
  article: PropTypes.object.isRequired,
};

export default Article;