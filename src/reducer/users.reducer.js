import * as types from '../actions/types';

const initialState = {
  users: [],
  loading: false,
  error: null
};

function reducer(prevState = initialState, action) {
  if (!action) return prevState;
  const newState = Object.assign({}, prevState);

  if (action.type === types.FETCH_USERS_REQUEST) {
    newState.loading = true;
    newState.users = [...prevState.users];
    return newState;
  }

  if (action.type === types.FETCH_USERS_SUCCESS) {
    newState.users = [...action.data.users];
    newState.loading = false;
    return newState;
  }

  if (action.type === types.FETCH_USERS_ERROR) {
    newState.error = Object.assign({}, action.data);
    newState.loading = false;
    newState.users = [...prevState.users];
    return newState;
  }
  return prevState;

}

export default reducer;
