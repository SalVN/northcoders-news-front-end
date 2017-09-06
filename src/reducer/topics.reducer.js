import * as types from '../actions/types';

const initialState = {
  topics: [],
  loading: false,
  error: null
};

function reducer (prevState = initialState, action) {
  if (!action) return prevState;
  const newState = Object.assign({}, prevState);

  if (action.type === types.FETCH_TOPICS_REQUEST) {
    newState.loading = true;
    newState.topics = [...prevState.topics];
    return newState;
  }

  if (action.type === types.FETCH_TOPICS_SUCCESS) {
    newState.topics = action.data;
    newState.loading = false;
    return newState;
  }

  if (action.type === types.FETCH_TOPICS_ERROR) {
    newState.error = Object.assign({}, action.data);
    newState.loading = false;
    newState.topics = [];
    return newState;
  }
  return prevState;

}

export default reducer;
