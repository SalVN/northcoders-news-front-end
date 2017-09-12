import * as actions from '../../src/actions/actions';

import reducer from '../../src/reducer/topicArticles.reducer';

describe('reducer', () => {
    const initialState = {
        topicArticles: [],
        loading: false,
        error: null
    };
    const topicState = {
        topicArticles: [{
            _id: '59b01acf006c8dbca914672f',
            title: 'Football is fun',
            body: 'something',
            belongs_to: 'football',
            __v: 0,
            votes: 5,
            comment_count: 0
        },
        {
            _id: '59b01acf006c8dbca914672e',
            title: 'Football is great',
            body: 'something',
            belongs_to: 'football',
            __v: 0,
            votes: 4,
            comment_count: 2
        }],
        loading: false,
        error: null
    };
    const topicArticles = [{
        _id: '59b01acf006c8dbca914672f',
        title: 'Football is fun',
        body: 'something',
        belongs_to: 'football',
        __v: 0,
        votes: 5,
        comment_count: 0
    },
    {
        _id: '59b01acf006c8dbca914672e',
        title: 'Football is great',
        body: 'something',
        belongs_to: 'football',
        __v: 0,
        votes: 4,
        comment_count: 2
    }];

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
        const action = actions.fetchTopicArticlesSuccess(topicArticles);
        const result = reducer(topicState, action);
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

    describe('VOTE_TOPIC_ARTICLE_REQUEST', () => {
        const action = actions.voteTopicArticleRequest();
        const result = reducer(topicState, action);
        it('should return loading as true', () => {
            expect(result.loading).toBe(true);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(result.topicArticles).toEqual(topicArticles);
            expect(result.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(topicState);
            expect(result.topicArticles).not.toBe(topicState.topicArticles);
        });
    });

    describe('VOTE_TOPIC_ARTICLE_SUCCESS', () => {
        const topicArticle = {
            _id: '59b01acf006c8dbca914672f',
            title: 'Football is fun',
            body: 'something',
            belongs_to: 'football',
            __v: 0,
            votes: 4,
            comment_count: 0
        };

        const updatedArticles = [{
            _id: '59b01acf006c8dbca914672f',
            title: 'Football is fun',
            body: 'something',
            belongs_to: 'football',
            __v: 0,
            votes: 4,
            comment_count: 0
        },
        {
            _id: '59b01acf006c8dbca914672e',
            title: 'Football is great',
            body: 'something',
            belongs_to: 'football',
            __v: 0,
            votes: 4,
            comment_count: 2
        }];
        const action = actions.voteTopicArticleSuccess({ article: topicArticle });
        const result = reducer(topicState, action);
        it('should return loading as false', () => {
            expect(result.loading).toBe(false);
        });

        it('should return an array of articles', () => {
            expect(Array.isArray(result.topicArticles)).toBe(true);
            expect(result.topicArticles.length).toBe(2);
        });

        it('should update the number of votes to the appropriate article in the articles list', () => {
            expect(result.topicArticles[0].votes).toBe(4);
            expect(result.topicArticles[1].votes).toBe(4);
            expect(result.topicArticles).toEqual(updatedArticles);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(result.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.topicArticles).not.toBe(initialState.topicArticles);
        });
    });

    describe('VOTE_TOPIC_ARTICLE_ERROR', () => {
        const error = { status: 400, message: 'INVALID URL' };
        const action = actions.voteTopicArticleError(error);
        const result = reducer(topicState, action);

        it('should return loading as false', () => {
            expect(result.loading).toBe(false);
        });

        it('should return an array identical to the previous state for topicArticles', () => {
            expect(result.topicArticles).toEqual(topicState.topicArticles);
        });

        it('should return the error', () => {
            expect(result.error).toEqual(error);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(topicState);
            expect(result.topicArticles).not.toBe(topicState.topicArticles);
        });
    });
});