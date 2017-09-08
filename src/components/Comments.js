import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../actions/actions';
import { sortComments } from '../utilities/sortComments';

// import AddCommentForm from './AddCommentForm';
import CommentsList from './CommentsList';

class Comments extends Component {
    render() {
        return (
            <CommentsList id={this.props.id} />
        );
    }
}

Comments.propTypes = {
    id: PropTypes.string.isRequired
};

export default Comments;