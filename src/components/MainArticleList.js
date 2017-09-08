import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';
import ArticleList from './ArticleList';

class MainArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.voteHandlerMainArticles = this.voteHandlerMainArticles.bind(this);
    }
    componentDidMount() {
        if (this.props.articles && this.props.articles.length < 1) {
            this.props.fetchArticles();
        }
    }
    render() {
        return (
            <div id='ArticleList'>
                <ArticleList
                    articles={this.props.articles}
                    voteArticle={this.voteHandlerMainArticles}
                />
            </div>
        );
    }
    voteHandlerMainArticles(vote, id) {
        this.props.voteArticle(vote, id);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchArticles: () => {
            dispatch(actions.fetchArticles());
        },
        voteArticle: (vote, id) => {
            dispatch(actions.voteArticle(vote, id));
        }
    };
}

function mapStateToProps(state) {
    return {
        articles: state.articles.articles,
        loading: state.articles.loading,
    };
}

MainArticleList.propTypes = {
    articles: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    fetchArticles: PropTypes.func.isRequired,
    voteArticle: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MainArticleList);