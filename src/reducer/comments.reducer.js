import * as types from '../actions/types';

const initialState = {
  comments: [],
  loading: false,
  error: null
};

function reducer(prevState = initialState, action) {
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
    if (prevState.comments.length > 0) newState.comments = [...prevState.comments, action.data];
    else newState.comments = [...prevState.comments, action.data];
    newState.loading = false;
    return newState;
  }

  if (action.type === types.ADD_COMMENT_ERROR) {
    newState.error = Object.assign({}, action.data);
    newState.loading = false;
    newState.comments = [...prevState.comments];
    return newState;
  }

  if (action.type === types.DELETE_COMMENT_REQUEST) {
    newState.loading = true;
    newState.comments = [...prevState.comments];
    return newState;
  }

  if (action.type === types.DELETE_COMMENT_SUCCESS) {
    newState.comments = [...prevState.comments];
    const index = getIndex(newState.comments, action.data._id);
    newState.comments.splice(index, 1);
    newState.loading = false;
    return newState;
  }

  if (action.type === types.DELETE_COMMENT_ERROR) {
    newState.error = Object.assign({}, action.data);
    newState.loading = false;
    newState.comments = [...prevState.comments];
    return newState;
  }

  return prevState;

}

export default reducer;

function getIndex(comments, deletedId) {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i]._id === deletedId) {
      return i;
    }
  }
}