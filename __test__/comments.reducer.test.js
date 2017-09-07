import * as actions from '../src/actions/actions';

import reducer from '../src/reducer/comments.reducer';

describe('reducer', () => {
    const initialState = {
        comments: [],
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

    describe('FETCH_COMMENTS_REQUEST', () => {
        const action = actions.fetchCommentsRequest();
        const result = reducer(initialState, action);
        it('should return loading as true', () => {
            expect(result.loading).toBe(true);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(result.comments).toEqual([]);
            expect(result.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.comments).not.toBe(initialState.comments);
        });
    });

    describe('FETCH_COMMENTS_SUCCESS', () => {
        const comments = [{
            _id: '59b11ae18807841d9bf13234',
            body: 'this is a comment',
            belongs_to: '59b11ae18807841d9bf13232',
            __v: 0,
            created_by: 'northcoder',
            votes: 0,
            created_at: 1504778965845
        },
        {
            _id: '59b11ae18807841d9bf13235',
            body: 'this is another comment',
            belongs_to: '59b11ae18807841d9bf13232',
            __v: 0,
            created_by: 'northcoder',
            votes: 0,
            created_at: 1504778965845
        },
        {
            _id: '59b11ae18807841d9bf13236',
            body: 'this is my comment',
            belongs_to: '59b11ae18807841d9bf13232',
            __v: 0,
            created_by: 'northcoder',
            votes: 0,
            created_at: 1504778977306
        }];

        const action = actions.fetchCommentsSuccess(comments);
        const result = reducer(initialState, action);
        it('should return loading as false', () => {
            expect(result.loading).toBe(false);
        });

        it('should return an array of comments', () => {
            expect(result.comments).toEqual(comments);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(result.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.comments).not.toBe(initialState.comments);
        });
    });

    describe('FETCH_COMMENTS_ERROR', () => {
        const error = { status: 400, message: 'INVALID URL' };
        const action = actions.fetchCommentsError(error);
        const result = reducer(initialState, action);

        it('should return loading as false', () => {
            expect(result.loading).toBe(false);
        });

        it('should return an empty array for comments', () => {
            expect(result.comments).toEqual([]);
        });

        it('should return the error', () => {
            expect(result.error).toEqual(error);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.comments).not.toBe(initialState.comments);
        });
    });
});