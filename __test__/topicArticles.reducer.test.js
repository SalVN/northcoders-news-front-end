import * as actions from '../src/actions/actions';

import reducer from '../src/reducer/topicArticles.reducer';

describe('reducer', () => {
    const initialState = {
        topicArticles: [],
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

    describe('FETCH_TOPIC_ARTICLES_REQUEST', () => {
        const action = actions.fetchTopicArticlesRequest();
        const result = reducer(initialState, action);
        it('should return loading as true', () => {
            expect(result.loading).toBe(true);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(result.topicArticles).toEqual([]);
            expect(result.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.topicArticles).not.toBe(initialState.topicArticles);
        });
    });

    describe('FETCH_TOPIC_ARTICLES_SUCCESS', () => {
        const topicArticles = [{
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
            title: 'Football is great',
            body: 'something',
            belongs_to: 'football',
            __v: 0,
            votes: 0,
            comment_count: 2
        }];

        const action = actions.fetchTopicArticlesSuccess(topicArticles);
        const result = reducer(initialState, action);
        it('should return loading as false', () => {
            expect(result.loading).toBe(false);
        });

        it('should return an array of topic articles', () => {
            expect(result.topicArticles).toEqual(topicArticles);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(result.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.topicArticles).not.toBe(initialState.topicArticles);
        });
    });

    describe('FETCH_TOPIC_ARTICLES_ERROR', () => {
        const error = { status: 400, message: 'INVALID URL' };
        const action = actions.fetchTopicArticlesError(error);
        const result = reducer(initialState, action);

        it('should return loading as false', () => {
            expect(result.loading).toBe(false);
        });

        it('should return an empty array for topicArticles', () => {
            expect(result.topicArticles).toEqual([]);
        });

        it('should return the error', () => {
            expect(result.error).toEqual(error);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.topicArticles).not.toBe(initialState.topicArticles);
        });
    });
});