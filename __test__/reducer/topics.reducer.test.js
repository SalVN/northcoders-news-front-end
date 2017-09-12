import * as actions from '../../src/actions/actions';

import reducer from '../../src/reducer/topics.reducer';

describe('reducer', () => {
    const initialState = {
        topics: [],
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

    it('uses the initial state if no state is provided', () => {
        const result = reducer();
        expect(result.topics).toEqual([]);
        expect(result.loading).toBe(false);
        expect(result.error).toBe(null);
    });

    it('returns the initial state if an incorrect action is provided', () => {
        const result = reducer(initialState, 'FETCH');
        expect(result).toBe(initialState);
    });

    describe('FETCH_TOPICS_REQUEST', () => {
        const action = actions.fetchTopicsRequest();
        const result = reducer(initialState, action);
        it('should return loading as true', () => {
            expect(result.loading).toBe(true);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(result.topics).toEqual([]);
            expect(result.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.topics).not.toBe(initialState.topics);
        });
    });

    describe('FETCH_TOPICS_SUCCESS', () => {
        const topics = [{
            _id: '59b04728371c52f1739aba0b',
            title: 'Football',
            slug: 'football',
            __v: 0
        },
        {
            _id: '59b04728371c52f1739aba0c',
            title: 'Cooking',
            slug: 'cooking',
            __v: 0
        },
        {
            _id: '59b04728371c52f1739aba0d',
            title: 'Cats',
            slug: 'cats',
            __v: 0
        }];


        const action = actions.fetchTopicsSuccess(topics);
        const result = reducer(initialState, action);
        it('should return loading as false', () => {
            expect(result.loading).toBe(false);
        });

        it('should return an array of topics', () => {
            expect(result.topics).toEqual(topics);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(result.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.topics).not.toBe(initialState.topics);
        });
    });

    describe('FETCH_TOPICS_ERROR', () => {
        const error = { status: 400, message: 'INVALID URL' };
        const action = actions.fetchTopicsError(error);
        const result = reducer(initialState, action);

        it('should return loading as false', () => {
            expect(result.loading).toBe(false);
        });

        it('should return an empty array for topics', () => {
            expect(result.topics).toEqual([]);
        });

        it('should return the error', () => {
            expect(result.error).toEqual(error);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.topics).not.toBe(initialState.topics);
        });
    });
});