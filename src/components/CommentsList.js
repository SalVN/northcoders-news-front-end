import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { sortComments } from '../utilities/sortComments';

import CommentCard from './CommentCard';
import './css/CommentsList.css';

const CommentsList = function (props) {
        let newest = (props.sortedBy === 'newest') ? 'comment-sort-active' : 'comment-sort-links';
        let votes = (props.sortedBy === 'votes') ? 'comment-sort-active' : 'comment-sort-links';
        let oldest = (props.sortedBy === 'oldest') ? 'comment-sort-active' : 'comment-sort-links';
        const users = props.users;
        sortComments(props.comments, props.sortedBy);
        const commentsToRender = props.comments.slice(0, props.maximum);
        return (
            <div>
                <div className='comment-sort-links'>
                    <a onClick={props.sortComments} className={`${newest}`}>
                        <span className='comment-sort-left'>sort by newest</span>
                    </a>
                    <a onClick={props.sortComments} className={`${oldest}`}>
                        <span className='comment-sort-left'>sort by oldest</span>
                    </a>
                    <a onClick={props.sortComments} className={`${votes}`}>
                        <span>sort by votes</span>
                    </a>
                </div>
                {commentsToRender.map(comment => {
                    const username = comment.created_by;
                    let index;
                    users &&
                        users.forEach((user, i) => {
                            if (user.username === username) index = i;
                        });
                    return (
                        <div key={comment._id}>
                            <CommentCard
                                deleteHandler={props.deleteHandler}
                                comment={comment}
                                voteHandler={props.voteHandler}
                                userData={users[index]}
                            />
                        </div>
                    );
                })}
                {props.maximum <= props.comments.length &&
                    <div className='show-more-button-div'>
                        <button className='button is-small show-more-button' onClick={props.viewMoreComments}>Show more</button>
                    </div>
                }
            </div>
        );
}

CommentsList.propTypes = {
    id: PropTypes.string,
    comments: PropTypes.any.isRequired,
    users: PropTypes.array.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    voteHandler: PropTypes.func.isRequired,
    maximum: PropTypes.number.isRequired,
    viewMoreComments: PropTypes.func.isRequired,
    sortedBy: PropTypes.string.isRequired,
    sortComments: PropTypes.func.isRequired
};

export default CommentsList;