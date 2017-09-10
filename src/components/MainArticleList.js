import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';
import ArticleList from './ArticleList';
import ArticleListHeader from './ArticleListHeader';
import './css/MainArticleList.css';

class MainArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: 'votes'
        };
        this.voteHandlerMainArticles = this.voteHandlerMainArticles.bind(this);
        this.handleClickSelect = this.handleClickSelect.bind(this);
    }
    componentDidMount() {
        if (this.props.articles && this.props.articles.length < 1) {
            this.props.fetchArticles();
        }
    }
    render() {
        return (
            <div id='ArticleList' className='content'>
                <ArticleListHeader 
                    title={'Articles'}
                    handleClickSelect={this.handleClickSelect}
                />
                <ArticleList
                    articles={this.props.articles}
                    voteArticle={this.voteHandlerMainArticles}
                    sortBy={this.state.sortBy}
                />
            </div>
        );
    }
    voteHandlerMainArticles(vote, id) {
        this.props.voteArticle(vote, id);
    }
    handleClickSelect(e) {
        e.preventDefault();
        this.setState({
            sortBy: e.target.value
        });
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