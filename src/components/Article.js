import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import './css/Article.css';

class Article extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='box article-card-style'>
                <div className='columns'>
                    <div className='column is-1'>
                        <button onClick={this.props.voteArticle.bind(this, 'up', this.props.article._id)} className='button is-black is-inverted is-small'><i className="fa fa-arrow-up" aria-hidden="true"></i></button>
                        <p className='comment-card-votes article-votes'><strong>{this.props.article.votes}</strong></p>
                        <button onClick={this.props.voteArticle.bind(this, 'down', this.props.article._id)} className='button is-black is-inverted is-small'><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
                    </div>
                    <div className='column'>
                        <div className='title is-3 article-title'>{this.props.article.title}</div>
                        <p>
                            <span>
                                <span className='article-subheading-key'>added by:</span>
                                <Link to='#'>
                                    <span>
                                        {this.props.user &&
                                            <img className='article-card-avatar' src={this.props.user.avatar_url} alt='user avatar' />
                                        }
                                    </span>
                                    <span className='article-subheading-value'>
                                        <strong>{this.props.article.created_by}</strong>
                                    </span>
                                </Link>
                            </span>
                            <span>
                                <span className='article-card-subheading-key'>tags:</span>
                                <Link to={`/topics/${this.props.article.belongs_to}/articles`}>
                                    <span className='article-card-subheading-value'>
                                        <strong>{this.props.article.belongs_to}</strong>
                                    </span>
                                </Link>
                            </span>
                            <span>
                                <span className='article-card-subheading-key'>comments:</span>
                                <a href='#comments'>
                                    <span className='article-card-subheading-value'>
                                        <strong>{this.props.article.comment_count}</strong>
                                    </span>
                                </a>
                            </span>
                        </p>
                        <div className='article-body'>{this.props.article.body}</div>
                    </div>
                </div>
            </div>
        );
    }
}

Article.propTypes = {
    article: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    voteArticle: PropTypes.func.isRequired
};

export default Article;