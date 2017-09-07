import * as types from '../actions/types';

const initialState = {
  comments: [],
  loading: false,
  error: null
};

function reducer (prevState = initialState, action) {
  if (!action) return prevState;
  const newState = Object.assign({}, prevState);

  if (action.type === types.FETCH_COMMENTS_REQUEST) {
    newState.loading = true;
    newState.comments = [...prevState.comments];
    return newState;
  }

  if (action.type === types.FETCH_COMMENTS_SUCCESS) {
    newState.comments = action.data;
    newState.loading = false;
    return newState;
  }

  if (action.type === types.FETCH_COMMENTS_ERROR) {
    newState.error = Object.assign({}, action.data);
    newState.loading = false;
    newState.comments = [];
    return newState;
  }

  if (action.type === types.ADD_COMMENT_REQUEST) {
    newState.loading = true;
    newState.comments = [...prevState.comments];
    return newState;
  }

  if (action.type === types.ADD_COMMENT_SUCCESS) {
    newState.comments = [...prevState.comments, action.data.savedComment];
    newState.loading = false;
    return newState;
  }

  if (action.type === types.ADD_COMMENT_ERROR) {
    newState.error = Object.assign({}, action.data);
    newState.loading = false;
    newState.comments = [...prevState.comments];
    return newState;
  }

  return prevState;

}

export default reducer;
