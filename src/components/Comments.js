import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import * as actions from '../actions/actions';

import AddCommentForm from './AddCommentForm';
import CommentsList from './CommentsList';
import './css/Comments.css';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: true,
            sortedBy: 'newest',
            added: false
        };
        this.toggleForm = this.toggleForm.bind(this);
    }
    render() {
        return (
            <div className='columns'>
                <div className='column is-one-quarter'>
                    <div className='comments-title'>
                        <span className='comments-title comments-title-main'>Comments</span>
                        <span className='comments-title comments-title-sub'>{`(${this.props.commentCount})`}</span>
                    </div>
                </div>
                <div className='column'>
                    {this.state.added &&
                        <div>
                            <h3>Your comment has been added</h3>
                        </div>
                    }
                    {this.state.showForm
                        ? (
                            <AddCommentForm toggleForm={this.toggleForm} id={this.props.id} />
                        )
                        : (
                            <button className='button' onClick={this.toggleForm}>
                                Add Comment...
                        </button>
                        )
                    }
                    <CommentsList id={this.props.id} />
                </div>
            </div>
        );
    }
    toggleForm() {
        this.setState({
            showForm: !this.state.showForm,
            added: false
        });
    }
}

Comments.propTypes = {
    id: PropTypes.string.isRequired,
    commentCount: PropTypes.number.isRequired
};

export default Comments;