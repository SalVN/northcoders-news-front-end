import * as actions from '../src/actions/actions';

import reducer from '../src/reducer/reducer';

describe('reducer', () => {
    const initialState = {
        articles: [],
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

    describe('FETCH_ARTICLES_REQUEST', () => {
        const action = actions.fetchArticlesRequest();
        it('should return loading as true', () => {
            const result = reducer(initialState, action);
            expect(result.loading).toBe(true);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            const result = reducer(initialState, action);
            expect(result.articles).toEqual([]);
            expect(result.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            const result = reducer(initialState, action);
            expect(result).not.toBe(initialState);
            expect(result.articles).not.toBe(initialState.articles);
        });
    });

    describe('FETCH_ARTICLES_SUCCESS', () => {
        const articles = [{
            _id: '59b01acf006c8dbca914672f',
            title: 'Football is fun',
            body: 'something',
            belongs_to: 'football',
            __v: 0,
            votes: 0,
            comment_count: 0
        },
        {
            _id: '59b01acf006c8dbca914672e',
            title: 'Cats are great',
            body: 'something',
            belongs_to: 'cats',
            __v: 0,
            votes: 0,
            comment_count: 2
        }];

        const action = actions.fetchArticlesSuccess(articles);
        it('should return loading as false', () => {
            const result = reducer(initialState, action);
            expect(result.loading).toBe(false);
        });

        it('should return an array of articles', () => {
            const result = reducer(initialState, action);
            expect(result.articles).toEqual(articles);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            const result = reducer(initialState, action);
            expect(result.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            const result = reducer(initialState, action);
            expect(result).not.toBe(initialState);
            expect(result.articles).not.toBe(initialState.articles);
        });
    });
});