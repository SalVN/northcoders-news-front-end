import React from 'react';
import PropTypes from 'prop-types';

import './css/MainArticleList.css';

const ArticleListHeader = function (props) {
    return (
        <div className='content'>
            <div className='columns'>
                <div className='column is-3'>
                    <h2 className='page-title'><strong>{props.title}</strong></h2>
                </div>
                <div className='column is-1 is-offset-5 label'>
                    <label htmlFor="Sort by">Sort by:</label>
                </div>
                <div className='column is-3'>
                    <div className='select is-primary select-menu'>
                        <select name="Sort by" onChange={props.handleClickSelect}>
                            <option value="votes">Popularity</option>
                            <option value="comments">Number of Comments</option>
                            <option value="random">Random</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

ArticleListHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleClickSelect: PropTypes.func.isRequired
};

export default ArticleListHeader;