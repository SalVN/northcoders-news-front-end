import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { sortComments } from '../utilities/sortComments';

import CommentCard from './CommentCard';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedBy: 'newest'
        };
    }
    componentDidMount() {
        this.props.fetchComments(this.props.id);
    }
    render() {
        sortComments(this.props.comments, this.state.sortedBy);
        return (
            <div>
                {this.props.comments.map(comment => {
                    return (
                        <div key={comment._id}>
                            <CommentCard comment={comment} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchComments: (id) => {
            dispatch(actions.fetchComments(id));
        },
    };
}

function mapStateToProps(state) {
    return {
        comments: state.comments.comments,
        loading: state.loading
    };
}

Comments.propTypes = {
    id: PropTypes.string.isRequired,
    fetchComments: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);