import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import AddCommentForm from './AddCommentForm';
import CommentsList from './CommentsList';
import './css/Comments.css';

import { USERNAME } from '../../config';

export class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            added: false,
            maximum: 8,
            voted: false
        };
        this.toggleForm = this.toggleForm.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.voteHandler = this.voteHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.viewMoreComments = this.viewMoreComments.bind(this);
    }
    componentDidMount() {
        this.props.fetchComments(this.props.id);
        if (!this.props.user.username) {
            this.props.fetchUser(USERNAME);
        }
    }
    componentWillReceiveProps(newProps) {
        if ((newProps.comments && newProps.comments.length !== this.props.comments.length) || this.state.voted) {
            this.props.fetchUsers();
            this.props.fetchUser(USERNAME);
            this.setState({ voted: false });
        }
    }
    render() {
        return (
            <div id='comments' className='columns'>
                <div className='column is-one-quarter'>
                    <p className='comments-title'>
                        <span className='comments-title is-size-2-desktop is-size-4-tablet comments-title-main'>Comments</span>
                        {this.props.comments
                            ? <span className='comments-title-sub is-hidden-tablet-only comments-title-sub'>{`(${this.props.comments.length})`}</span>
                            : (<span className='comments-title-sub is-hidden-tablet-only'>{'(0)'}</span>)
                        }
                    </p>
                    <p className='is-hidden-mobile is-hidden-desktop'>
                        {this.props.comments
                            ? <span className='comments-title comments-title-sub tablet'>{`(${this.props.comments.length})`}</span>
                            : <span className='comments-title comments-title-sub tablet'>{'(0)'}</span>
                        }
                    </p>
                </div>
                <div className='column'>
                    {this.state.added &&
                        <div>
                            <h3>Your comment has been added</h3>
                        </div>
                    }
                    {this.props.commentsLoading
                        ? <div className='article-list-loading-icon'>
                            <span>
                                <i className='fa fa-refresh fa-spin' />
                            </span>
                        </div>
                        :
                        <div>
                            <AddCommentForm
                                user={this.props.user}
                                showForm={this.state.showForm}
                                toggleForm={this.toggleForm}
                                handleSubmit={this.handleSubmit}
                                id={this.props.id} />
                            <CommentsList
                                users={this.props.users}
                                comments={this.props.comments}
                                deleteHandler={this.deleteHandler}
                                voteHandler={this.voteHandler}
                                maximum={this.state.maximum}
                                viewMoreComments={this.viewMoreComments}
                            />
                        </div>}
                </div>
            </div>
        );
    }
    toggleForm(text) {
        if (!text || (text && text.length === 0)) {
            this.setState({
                showForm: !this.state.showForm,
                added: false
            });
        }
    }
    deleteHandler(id) {
        this.props.deleteComment(id);
    }
    voteHandler(vote, id) {
        this.props.voteComment(vote, id);
        this.setState({
            voted: true
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const obj = {
            body: e.target[0].value,
            created_by: USERNAME
        };
        this.props.addComment(obj, this.props.id);
        this.setState({
            added: true,
            showForm: false
        });
    }
    viewMoreComments() {
        const newMax = this.state.maximum + 10;
        this.setState({
            maximum: newMax
        });
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
        fetchUser: (username) => {
            dispatch(actions.fetchOneUser(username));
        },
        addComment: (comment, id) => {
            dispatch(actions.addComment(comment, id));
        },
        fetchUsers: () => {
            dispatch(actions.fetchUsers());
        }
    };
}

function mapStateToProps(state) {
    return {
        comments: state.comments.comments,
        commentsLoading: state.comments.loading,
        userLoading: state.oneUser.loading,
        user: state.oneUser.user
    };
}

Comments.propTypes = {
    id: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    fetchComments: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    voteComment: PropTypes.func.isRequired,
    fetchUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    commentsLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);