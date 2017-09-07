import * as actions from '../src/actions/actions';
import reducer from '../src/reducer/users.reducer';

describe('reducer', () => {
    const initialState = {
        users: [],
        loading: false,
        error: null
    };
    it('is a function', () => {
        expect(typeof reducer).toBe('function');
    });

    it('returns the initial state if no action is provided', () => {
        const result = reducer(initialState);
        expect(result).toBe(initialState);
    });

    describe('FETCH_USERS_REQUEST', () => {
        const action = actions.fetchUsersRequest();
        const result = reducer(initialState, action);
        it('should return loading as true', () => {
            expect(result.loading).toBe(true);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(result.users).toEqual([]);
            expect(result.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.users).not.toBe(initialState.users);
        });
    });


});