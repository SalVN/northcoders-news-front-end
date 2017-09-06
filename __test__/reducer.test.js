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
});