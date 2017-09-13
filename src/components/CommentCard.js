import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import moment from 'moment';

import { USERNAME } from '../../config';

import './css/CommentCard.css';

const CommentCard = function (props) {
  return (
    <div className='card box-style'>
      <article className='media'>
        <div className='media-left'>
          <button onClick={props.voteHandler.bind(this, 'up', props.comment._id)} className='button is-black is-inverted is-small up'><i className="fa fa-arrow-up" aria-hidden="true"></i></button>
          <p className='comment-card-votes'><strong>{props.comment.votes}</strong></p>
          <button onClick={props.voteHandler.bind(this, 'down', props.comment._id)} className='button is-black is-inverted is-small down'><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
        </div>
        <div className='media-content'>
          <div className='content'>
              <div>
                <img className='comment-card-avatar' src={props.userData.avatar_url} alt='user avatar' />
                <Link to={`/users/${props.userData.username}`}><span className='comment-card-name'><strong>{props.comment.created_by}</strong></span></Link>
                <p className='comment-card-date'>{moment(props.comment.created_at).utc().format('Do MMMM YYYY, hh:mm')}</p>
              </div>
            <div className='comment-card-body'>{props.comment.body}</div>
            {props.comment.created_by === USERNAME &&
              <button onClick={props.deleteHandler.bind(this, props.comment._id)} className='button is-small delete-button'>Delete Comment</button>
            }
          </div>
        </div>
      </article>
    </div>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  voteHandler: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired
};


export default CommentCard;
