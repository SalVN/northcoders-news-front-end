import React from 'react';
import PropTypes from 'prop-types';

import './css/AddCommentForm.css';

class AddCommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.handleChange = this.handleChange.bind(this);
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
                                    <form onSubmit={this.props.handleSubmit}>
                                        <label className='comment-form-heading' htmlFor="comment-input">Join the conversation:</label>
                                        <br />
                                        <div className='comment-form' onBlur={this.props.toggleForm.bind(this, this.state.text)}>
                                            <textarea className='add-comment-textarea' onChange={this.handleChange} id="comment-input" defaultValue={this.state.text} placeholder='Join the conversation' />
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
}

AddCommentForm.propTypes = {
    id: PropTypes.string.isRequired,
    addComment: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    showForm: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default AddCommentForm;