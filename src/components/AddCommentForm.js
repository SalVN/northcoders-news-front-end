import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import PropTypes from 'prop-types';
import { USERNAME } from '../../config';

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
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="comment-input">Comment:</label>
                    <br />
                    <textarea onChange={this.handleChange} id="comment-input" defaultValue={this.state.text} placeholder='Add Comment'/>
                    <br />
                    <button className='button' type='submit'>
                        Submit
                    </button>
                    <button className='button'>Cancel</button>
                </form>
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
        const newObj = JSON.stringify(obj);
        console.log(newObj);
    }
}

export default AddCommentForm;