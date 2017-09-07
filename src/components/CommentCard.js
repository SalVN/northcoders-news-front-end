import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import { USERNAME } from '../../config';

const CommentCard = function (props) {
    return (
            <div className='box'>
      <article className='media'>
        <div className='media-left'>
          <button><i className="fa fa-arrow-up" aria-hidden="true"></i></button>
          <div>{props.comment.votes}</div>
          <button><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
        </div>

        <div className='media-content'>
          <div className='content'>
              <div>
              <span><strong>{props.comment.created_by}</strong></span>
              <span>{new Date (props.comment.created_at).toLocaleDateString()}</span>
              </div>
            <div>{props.comment.body}</div>
            {props.comment.created_by === USERNAME &&
              <button onClick={props.deleteHandler.bind(this, props.comment._id)} className='button'>Delete</button>
            }
          </div>
        </div>
      </article>
    </div>
    );
};

CommentCard.propTypes = {
    comment: PropTypes.object.isRequired,
    deleteHandler: PropTypes.func.isRequired
  };


export default CommentCard;
