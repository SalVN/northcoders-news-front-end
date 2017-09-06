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
    }); //
}); 