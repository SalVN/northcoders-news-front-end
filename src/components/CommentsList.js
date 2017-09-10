import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortComments } from '../utilities/sortComments';

import CommentCard from './CommentCard';

class CommentsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedBy: 'newest',
        };

    }
    componentWillReceiveProps(newProps) {
        if (this.props.comments && (newProps.comments !== this.props.comments) && this.state.showForm) {
            this.setState({
                sortedBy: 'newest'
            });
        }
    }
    render() {
        const users = this.props.users;
        sortComments(this.props.comments, this.state.sortedBy);
        return (
            <div>
                {this.props.comments.map(comment => {
                    const username = comment.created_by;
                    let index;
                    users &&
                        users.forEach((user, i) => {
                            if (user.username === username) index = i;
                        });
                    return (
                        <div key={comment._id}>
                            <CommentCard
                                deleteHandler={this.props.deleteHandler}
                                comment={comment}
                                voteHandler={this.props.voteHandler}
                                userData={users[index]}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}

CommentsList.propTypes = {
    id: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    voteHandler: PropTypes.func.isRequired
};

export default CommentsList;