import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import './css/Article.css';

const Article = function (props) {
    return (
        <div className='box'>
            <div className='columns'>
                <div className='column is-1'>
                    <button className='button is-black is-inverted is-small'><i className="fa fa-arrow-up" aria-hidden="true"></i></button>
                    <p className='comment-card-votes'><strong>{props.article.votes}</strong></p>
                    <button className='button is-black is-inverted is-small'><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
                </div>
                <div className='column'>
                    <div className='title is-3 article-title'>{props.article.title}</div>
                    <p>
                        <span>
                            <span className='article-subheading-key'>added by:</span>
                            <Link to='#'>
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
                            {/*<Link to='#'>*/}
                            <span className='article-card-subheading-value-notlink'>
                                <strong>{props.article.commentCount}</strong>
                            </span>
                            {/*</Link>*/}
                        </span>
                    </p>
                    <div>{props.article.body}</div>
                </div>
            </div>
        </div>
    );
};

Article.propTypes = {
    article: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default Article;