import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortComments } from '../utilities/sortComments';

import CommentCard from './CommentCard';
import './css/CommentsList.css';

class CommentsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedBy: 'newest',
        };
        this.sortComments = this.sortComments.bind(this);
    }
    componentWillReceiveProps(newProps) {
        if (this.props.comments && (newProps.comments !== this.props.comments) && this.state.showForm) {
            this.setState({
                sortedBy: 'newest'
            });
        }
    }
    render() {
        let newest = (this.state.sortedBy === 'newest') ? 'comment-sort-active' : 'comment-sort-links';
        let votes = (this.state.sortedBy === 'votes') ? 'comment-sort-active' : 'comment-sort-links';
        let oldest = (this.state.sortedBy === 'oldest') ? 'comment-sort-active' : 'comment-sort-links';

        const users = this.props.users;
        sortComments(this.props.comments, this.state.sortedBy);
        return (
            <div>
                <div className='comment-sort-links'>
                    <a onClick={this.sortComments} className={`${newest}`}>
                        <span className='comment-sort-left'>sort by newest</span>
                    </a>
                    <a onClick={this.sortComments} className={`${oldest}`}>
                        <span className='comment-sort-left'>sort by oldest</span>
                    </a>
                    <a onClick={this.sortComments} className={`${votes}`}>
                        <span>sort by votes</span>
                    </a>
                </div>
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
    sortComments(e) {
        e.preventDefault();
        let sort;
        if (e.target.innerText === 'sort by newest') sort = 'newest';
        if (e.target.innerText === 'sort by votes') sort = 'votes';
        if (e.target.innerText === 'sort by oldest') sort = 'oldest';
        this.setState({
            sortedBy: sort
        });
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