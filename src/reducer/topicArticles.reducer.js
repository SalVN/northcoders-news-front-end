import * as types from '../actions/types';
import {getIndex} from '../utilities/getIndex';

const initialState = {
  topicArticles: [],
  loading: false,
  error: null
};

function reducer(prevState = initialState, action) {
  if (!action) return prevState;
  const newState = Object.assign({}, prevState);

  if (action.type === types.FETCH_TOPIC_ARTICLES_REQUEST) {
    newState.loading = true;
    newState.topicArticles = [...prevState.topicArticles];
    return newState;
  }

  if (action.type === types.FETCH_TOPIC_ARTICLES_SUCCESS) {
    newState.topicArticles = action.data;
    newState.loading = false;
    newState.error = null;
    return newState;
  }

  if (action.type === types.FETCH_TOPIC_ARTICLES_ERROR) {
    newState.error = Object.assign({}, action.data);
    newState.loading = false;
    newState.topicArticles = [];
    return newState;
  }

  if (action.type === types.VOTE_TOPIC_ARTICLE_REQUEST) {
    newState.loading = true;
    newState.topicArticles = [...prevState.topicArticles];
    return newState;
  }

  if (action.type === types.VOTE_TOPIC_ARTICLE_SUCCESS) {
    newState.topicArticles = [...prevState.topicArticles];
    const index = getIndex(newState.topicArticles, action.data.article._id);
    newState.topicArticles[index] = action.data.article;
    newState.loading = false;
    return newState;
  }

  if (action.type === types.VOTE_TOPIC_ARTICLE_ERROR) {
    newState.error = Object.assign({}, action.data);
    newState.loading = false;
    newState.topicArticles = [...prevState.topicArticles];
    return newState;
  }
  return prevState;

}

export default reducer;