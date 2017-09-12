import React from 'react';
import PropTypes from 'prop-types';

import './css/MainArticleList.css';

class UsersListHeader extends React.Component {
    render() {
        let activeDropdown = this.props.showDropdown ? 'is-active' : '';
        return (
            <div className='content'>
                <div className='columns'>
                    <div className='column'>
                        <h2 className='page-title'><strong>Users</strong></h2>
                    </div>
                    <div className='column label has-text-left-mobile has-text-right-tablet'>
                        <div className={`dropdown has-text-left ${activeDropdown}`}>
                            <div className="dropdown-trigger">
                                <button onClick={this.props.toggleDropdown} className="button dropdown-button-article-list" aria-haspopup="true" aria-controls="dropdown-menu">
                                    <label htmlFor="Sort by">Sort by:</label>
                                    <span className="icon">
                                        <i className="fa fa-caret-down" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                <div className="dropdown-content">
                                    <a value="votes" onClick={this.props.handleClickSelect} className={'dropdown-item'}>
                                        Popularity
                                    </a>
                                    <a value="comments" onClick={this.props.handleClickSelect} className={'dropdown-item'}>
                                        Number of Comments
                                    </a>
                                    <a value="random" onClick={this.props.handleClickSelect} className={'dropdown-item'}>
                                        Random
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

UsersListHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleClickSelect: PropTypes.func.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    showDropdown: PropTypes.bool.isRequired
};

export default UsersListHeader;