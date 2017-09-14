import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import './css/Article.css';

const Article = function (props) {
        return (
            <div className='box article-card-style'>
                <div className='columns is-mobile'>
                    <div className='column is-1'>
                        <button
                            onClick={props.voteArticle.bind(this, 'up', props.article._id)}
                            className='button is-black is-inverted is-small up'>
                            <i className="fa fa-arrow-up" aria-hidden="true"></i>
                        </button>
                        <p className='comment-card-votes article-votes'><strong>{props.article.votes}</strong></p>
                        <button
                            onClick={props.voteArticle.bind(this, 'down', props.article._id)}
                            className='button is-black is-inverted is-small down'>
                            <i className="fa fa-arrow-down" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className='column'>
                        <div className='title is-3 article-title'>{props.article.title}</div>
                        <p>
                            <span>
                                <span className='article-subheading-key'>added by:</span>
                                <Link to={`/users/${props.article.created_by}`}>
                                    <span>
                                        {props.user &&
                                            <img className='article-card-avatar' src={props.user.avatar_url} alt='user avatar' />
                                        }
                                    </span>
                                    <span className='article-subheading-value'>
                                        <strong>{props.article.created_by}</strong>
                                    </span>
                                </Link>
                            </span>
                            <span>
                                <span className='article-card-subheading-key'>tags:</span>
                                <Link to={`/topics/${props.article.belongs_to}/articles`}>
                                    <span className='article-card-subheading-value'>
                                        <strong>{props.article.belongs_to}</strong>
                                    </span>
                                </Link>
                            </span>
                            <span>
                                <span className='article-card-subheading-key'>comments:</span>
                                <a href='#comments'>
                                    <span className='article-card-subheading-value'>
                                        <strong>{props.article.comment_count}</strong>
                                    </span>
                                </a>
                            </span>
                        </p>
                        <div className='article-body'>{props.article.body}</div>
                    </div>
                </div>
            </div>
        );
};

Article.propTypes = {
    article: PropTypes.object.isRequired,
    user: PropTypes.object,
    voteArticle: PropTypes.func.isRequired
};

export default Article;