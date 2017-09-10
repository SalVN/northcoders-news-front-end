import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import PropTypes from 'prop-types';
import { USERNAME } from '../../config';

import './css/AddCommentForm.css';

class AddCommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return (
            <div>
                {this.props.showForm
                    ?
                    <div className='box box-style box-style-comment box-style-comment'>
                        <article className='media'>
                            <div className='media-left'>
                                <img className='comment-form-image' src={this.props.user.avatar_url} />
                            </div>
                            <div className='media-content'>
                                <div className='content'>
                                    <form onSubmit={this.handleSubmit}>
                                        <label className='comment-form-heading' htmlFor="comment-input">Join the conversation:</label>
                                        <br />
                                        <div className='comment-form' onBlur={this.props.toggleForm.bind(this, this.state.text)}>
                                            <textarea className='add-comment-textarea' onChange={this.handleChange} id="comment-input" defaultValue={this.state.text} placeholder='Join the discussion' />
                                        </div>
                                        <div className='button-div'>
                                            <button className='button add-comment-submit' type='submit'>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </article>
                    </div>
                    : <div className='box box-style box-style-comment box-style-comment-small'>
                        <article className='media'>
                            <div className='media-left'>
                                <img className='comment-form-image' src={this.props.user.avatar_url} />
                            </div>
                            <div className='media-content'>
                                <div className='content'>
                                    <div onClick={this.props.toggleForm.bind(this, null)} className='comment-form-small'>
                                        <p>Join the conversation</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                }
            </div>
        );
    }
    handleChange(e) {
        this.setState({
            text: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const obj = {
            body: this.state.text,
            created_by: USERNAME
        };
        this.props.addComment(obj, this.props.id);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addComment: (comment, id) => {
            dispatch(actions.addComment(comment, id));
        }
    };
}

function mapStateToProps(state) {
    return {
        loading: state.loading
    };
}

AddCommentForm.propTypes = {
    id: PropTypes.string.isRequired,
    addComment: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    showForm: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentForm);