import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';
import ArticleList from './ArticleList';
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
        console.log(this.state.sortBy);
        return (
            <div id='ArticleList' className='content'>
                <div className='columns'>
                    <div className='column is-3'>
                        <h2 className='page-title'><strong>Articles</strong></h2>
                    </div>
                    <div className='column is-1 is-offset-5 label'>
                        <label htmlFor="Sort by">Sort by:</label>
                    </div>
                    <div className='column is-3'>
                        <div className='select is-primary select-menu'>
                            <select name="Sort by" onChange={this.handleClickSelect}>
                                <option value="votes">Popularity</option>
                                <option value="comments">Number of Comments</option>
                                <option disabled value="random">Randomly</option>
                            </select>
                        </div>
                    </div>
                </div>
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