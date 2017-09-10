import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import AddCommentForm from './AddCommentForm';
import CommentsList from './CommentsList';
import './css/Comments.css';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: true,
            added: false
        };
        this.toggleForm = this.toggleForm.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.voteHandler = this.voteHandler.bind(this);
    }
    componentDidMount() {
        this.props.fetchComments(this.props.id);
        if (this.props.users && this.props.users.length < 1) {
            this.props.fetchUsers();
        }
    }
    render() {
        return (
            <div className='columns'>
                <div className='column is-one-quarter'>
                    <div className='comments-title'>
                        <span className='comments-title comments-title-main'>Comments</span>
                        {this.props.comments 
                        ? <span className='comments-title comments-title-sub'>{`(${this.props.comments.length})`}</span>
                        : <span className='comments-title comments-title-sub'>{'(0)'}</span>
                        }
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
                    <CommentsList
                        id={this.props.id}
                        users={this.props.users}
                        comments={this.props.comments}
                        deleteHandler={this.deleteHandler}
                        voteHandler={this.voteHandler}
                    />
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
    deleteHandler(id) {
        this.props.deleteComment(id);
    }
    voteHandler(vote, id) {
        this.props.voteComment(vote, id);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchComments: (id) => {
            dispatch(actions.fetchComments(id));
        },
        deleteComment: (id) => {
            dispatch(actions.deleteComment(id));
        },
        voteComment: (vote, id) => {
            dispatch(actions.voteComment(vote, id));
        },
        fetchUsers: () => {
            dispatch(actions.fetchUsers());
        }
    };
}

function mapStateToProps(state) {
    return {
        comments: state.comments.comments,
        loading: state.loading,
        users: state.users.users
    };
}

Comments.propTypes = {
    id: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    fetchComments: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    voteComment: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);