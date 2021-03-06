import * as types from '../actions/types';
import {getIndex} from '../utilities/getIndex';

const initialState = {
  articles: [],
  loading: false,
  error: null
};

function reducer(prevState = initialState, action) {
  if (!action) return prevState;
  const newState = Object.assign({}, prevState);

  if (action.type === types.FETCH_ARTICLES_REQUEST) {
    newState.loading = true;
    newState.articles = [...prevState.articles];
    return newState;
  }

  if (action.type === types.FETCH_ARTICLES_SUCCESS) {
    newState.articles = action.data;
    newState.loading = false;
    return newState;
  }

  if (action.type === types.FETCH_ARTICLES_ERROR) {
    newState.error = Object.assign({}, action.data);
    newState.loading = false;
    newState.articles = [];
    return newState;
  }

  if (action.type === types.VOTE_ARTICLE_REQUEST) {
    newState.loading = true;
    newState.articles = [...prevState.articles];
    return newState;
  }

  if (action.type === types.VOTE_ARTICLE_SUCCESS) {
    newState.articles = [...prevState.articles];
    const index = getIndex(newState.articles, action.data.article._id);
    newState.articles[index] = action.data.article;
    newState.loading = false;
    return newState;
  }

  if (action.type === types.VOTE_ARTICLE_ERROR) {
    newState.error = Object.assign({}, action.data);
    newState.loading = false;
    newState.articles = [...prevState.articles];
    return newState;
  }
  return prevState;

}

export default reducer;
