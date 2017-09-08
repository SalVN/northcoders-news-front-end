import * as actions from '../src/actions/actions';
import reducer from '../src/reducer/users.reducer';

describe('reducer', () => {
    const initialState = {
        users: [],
        loading: false,
        error: null
    };

    const userState = {
        users: [{
            _id: '59b1b18b327cce1fb043bdb1',
            username: 'northcoder',
            name: 'Awesome Northcoder',
            avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
            __v: 0
        }, {
            _id: '59b1b18b327cce1fb043bdb2',
            username: 'javascripter',
            name: 'Awesome Javascripter',
            avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
            __v: 0
        }],
        loading: false,
        error: null
    };
    const users = [{
        _id: '59b1b18b327cce1fb043bdb1',
        username: 'northcoder',
        name: 'Awesome Northcoder',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }, {
        _id: '59b1b18b327cce1fb043bdb2',
        username: 'javascripter',
        name: 'Awesome Javascripter',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }];
    it('is a function', () => {
        expect(typeof reducer).toBe('function');
    });

    it('returns the initial state if no action is provided', () => {
        const resultEmpty = reducer(initialState);
        const resultUsers = reducer(userState);
        expect(resultEmpty).toBe(initialState);
        expect(resultUsers).toBe(userState);
    });

    describe('FETCH_USERS_REQUEST', () => {
        const action = actions.fetchUsersRequest();
        const resultEmpty = reducer(initialState, action);
        const resultUsers = reducer(userState, action);
        it('should return loading as true', () => {
            expect(resultEmpty.loading).toBe(true);
            expect(resultUsers.loading).toBe(true);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(resultEmpty.users).toEqual([]);
            expect(resultEmpty.error).toBe(null);
            expect(resultUsers.users).toEqual(users);
            expect(resultUsers.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(resultEmpty).not.toBe(initialState);
            expect(resultEmpty.users).not.toBe(initialState.users);

            expect(resultUsers).not.toBe(userState);
            expect(resultUsers.users).not.toBe(userState.users);
        });
    });

    describe('FETCH_USERS_SUCCESS', () => {
        const action = actions.fetchUsersSuccess(users);
        const resultEmpty = reducer(initialState, action);
        const resultUsers = reducer(userState, action);
        it('should return loading as false', () => {
            expect(resultEmpty.loading).toBe(false);
            expect(resultUsers.loading).toBe(false);
        });

        it('should return an array of topic articles', () => {
            expect(resultEmpty.users).toEqual(users);
            expect(resultUsers.users).toEqual(users);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(resultEmpty.error).toBe(null);
            expect(resultUsers.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(resultEmpty).not.toBe(initialState);
            expect(resultEmpty.users).not.toBe(initialState.users);

            expect(resultUsers).not.toBe(userState);
            expect(resultUsers.users).not.toBe(userState.users);
        });
    });

    describe('FETCH_USERS_ERROR', () => {
        const error = { status: 400, message: 'INVALID URL' };
        const action = actions.fetchUsersError(error);
        const resultEmpty = reducer(initialState, action);
        const resultUsers = reducer(userState, action);

        it('should return loading as false', () => {
            expect(resultEmpty.loading).toBe(false);
            expect(resultUsers.loading).toBe(false);
        });

        it('should return the initial state for topicArticles', () => {
            expect(resultEmpty.users).toEqual([]);
            expect(resultUsers.users).toEqual(users);
        });

        it('should return the error', () => {
            expect(resultEmpty.error).toEqual(error);
            expect(resultUsers.error).toEqual(error);
        });

        it('should not mutate the initial state', () => {
            expect(resultEmpty).not.toBe(initialState);
            expect(resultEmpty.users).not.toBe(initialState.users);

            expect(resultUsers).not.toBe(userState);
            expect(resultUsers.users).not.toBe(userState.users);
        });
    });

});