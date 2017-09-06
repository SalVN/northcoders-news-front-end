import * as types from '../actions/types';

const initialState = {
  articles: [],
  loading: false,
  error: null
};

function reducer (prevState = initialState, action) {
  if (!action) return prevState;
  const newState = Object.assign({}, prevState);

  if (action.type === types.FETCH_ARTICLES_REQUEST) {
    newState.loading = true;
    newState.articles = [...prevState.articles];
    return newState;
  }

  if (action.type === types.FETCH_ARTICLES_SUCCESS) {
    newState.data = action.data;
    newState.loading = false;
    return newState;
  }

  if (action.type === types.FETCH_ARTICLES_ERROR) {
    newState.error = action.data;
    newState.loading = false;
    newState.data = [];
    return newState;
  }
  return prevState;

}

export default reducer;
