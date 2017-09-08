import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { sortComments } from '../utilities/sortComments';

import AddCommentForm from './AddCommentForm';
import CommentCard from './CommentCard';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedBy: 'newest',
            showForm: false,
            added: false
        };
        this.toggleForm = this.toggleForm.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.voteHandler = this.voteHandler.bind(this);
    }
    componentWillReceiveProps(newProps) {
        if (this.props.comments && (newProps.comments !== this.props.comments) && this.state.showForm) {
            this.setState({
                showForm: false,
                added: true,
                sortedBy: 'newest'
            });
        }
    }
    componentDidMount() {
        this.props.fetchComments(this.props.id);
        this.props.fetchUsers();
    }
    render() {
        sortComments(this.props.comments, this.state.sortedBy);
        return (
            <div>
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
                {this.props.comments.map(comment => {
                    return (
                        <div key={comment._id}>
                            <CommentCard
                                deleteHandler={this.deleteHandler}
                                comment={comment}
                                voteHandler={this.voteHandler} />
                        </div>
                    );
                })}
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
        users: state.users
    };
}

Comments.propTypes = {
    id: PropTypes.string.isRequired,
    fetchComments: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired,
    voteComment: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);