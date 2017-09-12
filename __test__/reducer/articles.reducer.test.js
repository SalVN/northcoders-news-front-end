import * as actions from '../../src/actions/actions';

import reducer from '../../src/reducer/articles.reducer';

describe('reducer', () => {
    const initialState = {
        articles: [],
        loading: false,
        error: null
    };

    const articlesState = {
        articles: [{
            _id: '59b01acf006c8dbca914672f',
            title: 'Football is fun',
            body: 'something',
            belongs_to: 'football',
            __v: 0,
            votes: 3,
            comment_count: 0
        },
        {
            _id: '59b01acf006c8dbca914672e',
            title: 'Cats are great',
            body: 'something',
            belongs_to: 'cats',
            __v: 0,
            votes: 2,
            comment_count: 2
        }],
        loading: false,
        error: null
    };
    const articles = [{
        _id: '59b01acf006c8dbca914672f',
        title: 'Football is fun',
        body: 'something',
        belongs_to: 'football',
        __v: 0,
        votes: 3,
        comment_count: 0
    },
    {
        _id: '59b01acf006c8dbca914672e',
        title: 'Cats are great',
        body: 'something',
        belongs_to: 'cats',
        __v: 0,
        votes: 2,
        comment_count: 2
    }];

    it('is a function', () => {
        expect(typeof reducer).toBe('function');
    });

    it('returns the initial state if no action is provided', () => {
        const result = reducer(initialState);
        expect(result).toBe(initialState);
    });

    describe('FETCH_ARTICLES_REQUEST', () => {
        const action = actions.fetchArticlesRequest();
        const result = reducer(initialState, action);
        it('should return loading as true', () => {
            expect(result.loading).toBe(true);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(result.articles).toEqual([]);
            expect(result.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.articles).not.toBe(initialState.articles);
        });
    });

    describe('FETCH_ARTICLES_SUCCESS', () => {

        const action = actions.fetchArticlesSuccess(articles);
        const result = reducer(initialState, action);
        it('should return loading as false', () => {
            expect(result.loading).toBe(false);
        });

        it('should return an array of articles', () => {
            expect(result.articles).toEqual(articles);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(result.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.articles).not.toBe(initialState.articles);
        });
    });

    describe('FETCH_ARTICLES_ERROR', () => {
        const error = { status: 400, message: 'INVALID URL' };
        const action = actions.fetchArticlesError(error);
        const result = reducer(initialState, action);

        it('should return loading as false', () => {
            expect(result.loading).toBe(false);
        });

        it('should return an empty array for articles', () => {
            expect(result.articles).toEqual([]);
        });

        it('should return the error', () => {
            expect(result.error).toEqual(error);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.articles).not.toBe(initialState.articles);
        });
    });

    describe('VOTE_ARTICLES_REQUEST', () => {
        const action = actions.voteArticleRequest();
        const resultArticles = reducer(articlesState, action);
        it('should return loading as true', () => {
            expect(resultArticles.loading).toBe(true);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(resultArticles.articles).toEqual(articles);
            expect(resultArticles.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(resultArticles).not.toBe(articlesState);
            expect(resultArticles.articles).not.toBe(articlesState.articles);
        });
    });

    describe('VOTE_ARTICLE_SUCCESS', () => {
        const article = {
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
            title: 'Cats are great',
            body: 'something',
            belongs_to: 'cats',
            __v: 0,
            votes: 2,
            comment_count: 2
        }];
        const action = actions.voteArticleSuccess({article: article});
        const result = reducer(articlesState, action);
        it('should return loading as false', () => {
            expect(result.loading).toBe(false);
        });

        it('should return an array of articles', () => {
            expect(Array.isArray(result.articles)).toBe(true);
            expect(result.articles.length).toBe(2);
        });

        it('should update the number of votes to the appropriate article in the articles list', () => {
            expect(result.articles[0].votes).toBe(4);
            expect(result.articles[1].votes).toBe(2);
            expect(result.articles).toEqual(updatedArticles);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(result.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.articles).not.toBe(initialState.articles);
        });
    });

    describe('VOTE_ARTICLE_ERROR', () => {
        const error = { status: 400, message: 'INVALID URL' };
        const action = actions.voteArticleError(error);
        const result = reducer(articlesState, action);

        it('should return loading as false', () => {
            expect(result.loading).toBe(false);
        });

        it('should return an array identical to the previous state for articles', () => {
            expect(result.articles).toEqual(articlesState.articles);
        });

        it('should return the error', () => {
            expect(result.error).toEqual(error);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(articlesState);
            expect(result.articles).not.toBe(articlesState.articles);
        });
    });
});