import * as actions from '../../src/actions/actions';
import reducer from '../../src/reducer/oneUser.reducer';

describe('reducer', () => {
    const initialState = {
        user: {},
        loading: false,
        error: null
    };

    const userState = {
        user: {
            _id: '59b1b18b327cce1fb043bdb2',
            username: 'northcoder',
            name: 'Awesome Northcoder',
            avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
            __v: 0
        },
        loading: false,
        error: null
    };
    const user = {
        _id: '59b1b18b327cce1fb043bdb2',
        username: 'northcoder',
        name: 'Awesome Northcoder',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    };
    it('is a function', () => {
        expect(typeof reducer).toBe('function');
    });

    it('returns the initial state if no action is provided', () => {
        const resultEmpty = reducer(initialState);
        const resultUsers = reducer(userState);
        expect(resultEmpty).toBe(initialState);
        expect(resultUsers).toBe(userState);
    });

    describe('FETCH_ONE_USER_REQUEST', () => {
        const action = actions.fetchOneUserRequest();
        const resultEmpty = reducer(initialState, action);
        const resultUser = reducer(userState, action);
        it('should return loading as true', () => {
            expect(resultEmpty.loading).toBe(true);
            expect(resultUser.loading).toBe(true);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(resultEmpty.user).toEqual({});
            expect(resultEmpty.error).toBe(null);
            expect(resultUser.user).toEqual(user);
            expect(resultUser.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(resultEmpty).not.toBe(initialState);
            expect(resultEmpty.user).not.toBe(initialState.user);

            expect(resultUser).not.toBe(userState);
            expect(resultUser.user).not.toBe(userState.user);
        });
    });

    describe('FETCH_ONE_USER_SUCCESS', () => {
        const action = actions.fetchOneUserSuccess({user: user});
        const resultEmpty = reducer(initialState, action);
        const resultUser = reducer(userState, action);
        it('should return loading as false', () => {
            expect(resultEmpty.loading).toBe(false);
            expect(resultUser.loading).toBe(false);
        });

        it('should return the user object', () => {
            expect(resultEmpty.user).toEqual(user);
            expect(resultUser.user).toEqual(user);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(resultEmpty.error).toBe(null);
            expect(resultUser.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(resultEmpty).not.toBe(initialState);
            expect(resultEmpty.user).not.toBe(initialState.user);

            expect(resultUser).not.toBe(userState);
            expect(resultUser.user).not.toBe(userState.user);
        });
    });

    describe('FETCH_ONE_USER_ERROR', () => {
        const error = { status: 400, message: 'INVALID URL' };
        const action = actions.fetchOneUserError(error);
        const resultEmpty = reducer(initialState, action);
        const resultUser = reducer(userState, action);

        it('should return loading as false', () => {
            expect(resultEmpty.loading).toBe(false);
            expect(resultUser.loading).toBe(false);
        });

        it('should return the initial state for topicArticles', () => {
            expect(resultEmpty.user).toEqual({});
            expect(resultUser.user).toEqual(user);
        });

        it('should return the error', () => {
            expect(resultEmpty.error).toEqual(error);
            expect(resultUser.error).toEqual(error);
        });

        it('should not mutate the initial state', () => {
            expect(resultEmpty).not.toBe(initialState);
            expect(resultEmpty.user).not.toBe(initialState.user);

            expect(resultUser).not.toBe(userState);
            expect(resultUser.user).not.toBe(userState.user);
        });
    });

});