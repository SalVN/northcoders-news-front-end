import React, { Component } from 'react';
import PropTypes from 'prop-types';

const comments = [{
    _id: '59b11ae18807841d9bf13234',
    body: 'this is a comment',
    belongs_to: '59b11ae18807841d9bf13232',
    __v: 0,
    created_by: 'northcoder',
    votes: 0,
    created_at: 1504778965845
},
{
    _id: '59b11ae18807841d9bf13235',
    body: 'this is another comment',
    belongs_to: '59b11ae18807841d9bf13232',
    __v: 0,
    created_by: 'northcoder',
    votes: 0,
    created_at: 1504778965845
},
{
    _id: '59b11ae18807841d9bf13236',
    body: 'this is my comment',
    belongs_to: '59b11ae18807841d9bf13232',
    __v: 0,
    created_by: 'northcoder',
    votes: 0,
    created_at: 1504778977306
}];

class Comments extends Component {
    render() {
        return (
            <div>
                {comments.map(comment => {
                    return (
                        <div>
                            comment
                        {comment.body}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Comments;