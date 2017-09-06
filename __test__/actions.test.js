import * as actions from '../src/actions/actions';
import * as types from '../src/actions/types';

describe('actions', () => {
    describe('#fetchArticles', () => {
        it('is a function', () => {
            expect(typeof actions.fetchArticles).toBe('function');
        });

        describe('#fetchArticlesRequest', () => {
            it('is a function', () => {
                expect(typeof actions.fetchArticlesRequest).toBe('function');
            });

            it('should return the expected action', function () {
                expect(actions.fetchArticlesRequest()).toEqual({
                    type: types.FETCH_ARTICLES_REQUEST
                });
            });
        });

        describe('#fetchArticlesSuccess', () => {
            it('is a function', () => {
                expect(typeof actions.fetchArticlesSuccess).toBe('function');
            });

            it('should the expected action', function () {
                expect(actions.fetchArticlesSuccess(['articles'])).toEqual({
                    type: types.FETCH_ARTICLES_SUCCESS,
                    data: ['articles']
                });
            });
        });

        describe('#fetchArticlesError', () => {
            it('is a function', () => {
                expect(typeof actions.fetchArticlesError).toBe('function');
            });

            it('returns the expected action', function () {
                expect(actions.fetchArticlesError('err')).toEqual({
                    type: types.FETCH_ARTICLES_ERROR,
                    data: 'err'
                });
            });
        });

        describe('#fetchTopics', () => {
            it('is a function', () => {
                expect(typeof actions.fetchTopics).toBe('function');
            });

            describe('#fetchTopicsRequest', () => {
                it('is a function', () => {
                    expect(typeof actions.fetchTopicsRequest).toBe('function');
                });

                it('should return the expected action', function () {
                    expect(actions.fetchTopicsRequest()).toEqual({
                        type: types.FETCH_TOPICS_REQUEST
                    });
                });
            });

            describe('#fetchTopicsSuccess', () => {
                it('is a function', () => {
                    expect(typeof actions.fetchTopicsSuccess).toBe('function');
                });

                it('should the expected action', function () {
                    expect(actions.fetchTopicsSuccess(['topics'])).toEqual({
                        type: types.FETCH_TOPICS_SUCCESS,
                        data: ['topics']
                    });
                });
            });

            describe('#fetchTopicsError', () => {
                it('is a function', () => {
                    expect(typeof actions.fetchTopicsError).toBe('function');
                });

                it('returns the expected action', function () {
                    expect(actions.fetchTopicsError('err')).toEqual({
                        type: types.FETCH_TOPICS_ERROR,
                        data: 'err'
                    });
                });
            });
        }); //
    }); 
});