import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import CommentCard from './CommentCard';

class Comments extends Component {
    componentDidMount() {
        this.props.fetchComments(this.props.id);
    }
    render() {
        return (
            <div>
                {this.props.comments.map(comment => {
                    return (
                        <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Comments);