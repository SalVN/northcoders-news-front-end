import * as types from '../actions/types';

const initialState = {
    user: {},
    loading: false,
    error: null
};

function reducer(prevState = initialState, action) {
    if (!action) return prevState;
    const newState = Object.assign({}, prevState);

    if (action.type === types.FETCH_ONE_USER_REQUEST) {
        newState.loading = true;
        newState.user = Object.assign({}, prevState.user);
        return newState;
    }

    if (action.type === types.FETCH_ONE_USER_SUCCESS) {
        newState.user = Object.assign({}, action.data.user);
        newState.loading = false;
        return newState;
    }

    if (action.type === types.FETCH_ONE_USER_ERROR) {
        newState.error = Object.assign({}, action.data);
        newState.loading = false;
        newState.user = Object.assign({}, prevState.user);
        return newState;
    }
    return prevState;

}

export default reducer;
