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

  return prevState;

}

export default reducer;
