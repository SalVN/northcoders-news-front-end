import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './css/ArticlePage.css';
import Article from './Article';
import * as actions from '../actions/actions';

class ArticlePage extends Component {
    componentDidMount() {
        this.props.fetchArticles();
    }
    render() {
        let article;
        if (this.props.articles) {
            article = this.props.articles.reduce((acc, article) => {
                if (article._id === this.props.match.params.id) acc = article;
                return acc;
            }, {});
        }
        return (
            <div className='article-page'>
                <Article article={article}/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchArticles: () => {
            dispatch(actions.fetchArticles());
        }
    };
}

function mapStateToProps(state) {
    return {
        articles: state.articles.articles,
        loading: state.loading
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);