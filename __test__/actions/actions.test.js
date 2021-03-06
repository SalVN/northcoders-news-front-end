import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ROOT } from '../../config';
import moxios from 'moxios';

import * as actions from '../../src/actions/actions';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {

    describe('#fetchArticles', () => {
        describe('function', () => {
            beforeEach(function () {
                moxios.install();
            });

            afterEach(function () {
                moxios.uninstall();
            });

            it('is a function', () => {
                expect(typeof actions.fetchArticles).toBe('function');
            });

            it('creates FETCH_ARTICLES_SUCCESS when fetching articles has completed successfully', () => {
                moxios.stubRequest(`${ROOT}/articles`,
                    {
                        status: 200,
                        response: { articles: ['articles'] }
                    }
                );

                const expectedActions = [
                    { type: types.FETCH_ARTICLES_REQUEST },
                    { type: types.FETCH_ARTICLES_SUCCESS, data: ['articles'] }
                ];
                const store = mockStore({ articles: [] });

                return store.dispatch(actions.fetchArticles())
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });

            it('creates FETCH_ARTICLES_ERROR when fetching articles is unsuccessful', () => {
                moxios.stubRequest(`${ROOT}/articles`, { status: 400 });
                const expectedActions = [
                    { type: types.FETCH_ARTICLES_REQUEST },
                    { type: types.FETCH_ARTICLES_ERROR, data: new Error('Request failed with status code 400') }
                ];
                const store = mockStore({ articles: [] });

                return store.dispatch(actions.fetchArticles())
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });
        });

        describe('#fetchArticlesRequest', () => {
            beforeEach(function () {
                moxios.install();
            });
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
    });

    describe('#fetchTopics', () => {


        describe('function', () => {
            beforeEach(function () {
                moxios.install();
            });

            afterEach(function () {
                moxios.uninstall();
            });

            it('is a function', () => {
                expect(typeof actions.fetchTopics).toBe('function');
            });

            it('creates FETCH_TOPICS_SUCCESS when fetching topics has completed successfully', () => {
                moxios.stubRequest(`${ROOT}/topics`,
                    {
                        status: 200,
                        response: { topics: ['topics'] }
                    }
                );

                const expectedActions = [
                    { type: types.FETCH_TOPICS_REQUEST },
                    { type: types.FETCH_TOPICS_SUCCESS, data: ['topics'] }
                ];
                const store = mockStore({ topics: [] });

                return store.dispatch(actions.fetchTopics())
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });

            it('creates FETCH_TOPICS_ERROR when fetching topics is unsuccessful', () => {
                moxios.stubRequest(`${ROOT}/topics`, { status: 400 });
                const expectedActions = [
                    { type: types.FETCH_TOPICS_REQUEST },
                    { type: types.FETCH_TOPICS_ERROR, data: new Error('Request failed with status code 400') }
                ];
                const store = mockStore({ topics: [] });

                return store.dispatch(actions.fetchTopics())
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });
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
    });

    describe('#fetchComments', () => {

        describe('function', () => {
            beforeEach(function () {
                moxios.install();
            });

            afterEach(function () {
                moxios.uninstall();
            });

            it('is a function', () => {
                expect(typeof actions.fetchComments).toBe('function');
            });

            it('creates FETCH_COMMENTS_SUCCESS when fetching comments has completed successfully', () => {
                moxios.stubRequest(`${ROOT}/articles/id/comments`,
                    {
                        status: 200,
                        response: { comments: ['comments'] }
                    }
                );

                const expectedActions = [
                    { type: types.FETCH_COMMENTS_REQUEST },
                    { type: types.FETCH_COMMENTS_SUCCESS, data: ['comments'] }
                ];
                const store = mockStore({ comments: [] });

                return store.dispatch(actions.fetchComments('id'))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });

            it('creates FETCH_COMMENTS_ERROR when fetching articles is unsuccessful', () => {
                moxios.stubRequest(`${ROOT}/articles/id/comments`, { status: 400 });
                const expectedActions = [
                    { type: types.FETCH_COMMENTS_REQUEST },
                    { type: types.FETCH_COMMENTS_ERROR, data: new Error('Request failed with status code 400') }
                ];
                const store = mockStore({ comments: [] });

                return store.dispatch(actions.fetchComments('id'))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });
        });

        describe('#fetchCommentsRequest', () => {
            it('is a function', () => {
                expect(typeof actions.fetchCommentsRequest).toBe('function');
            });

            it('should return the expected action', function () {
                expect(actions.fetchCommentsRequest()).toEqual({
                    type: types.FETCH_COMMENTS_REQUEST
                });
            });
        });

        describe('#fetchCommentsSuccess', () => {
            it('is a function', () => {
                expect(typeof actions.fetchCommentsSuccess).toBe('function');
            });

            it('should the expected action', function () {
                expect(actions.fetchCommentsSuccess(['comments'])).toEqual({
                    type: types.FETCH_COMMENTS_SUCCESS,
                    data: ['comments']
                });
            });
        });

        describe('#fetchCommentsError', () => {
            it('is a function', () => {
                expect(typeof actions.fetchCommentsError).toBe('function');
            });

            it('returns the expected action', function () {
                expect(actions.fetchCommentsError('err')).toEqual({
                    type: types.FETCH_COMMENTS_ERROR,
                    data: 'err'
                });
            });
        });
    });

    describe('#fetchTopicArticles', () => {
        describe('function', () => {
            beforeEach(function () {
                moxios.install();
            });

            afterEach(function () {
                moxios.uninstall();
            });

            it('is a function', () => {
                expect(typeof actions.fetchTopicArticles).toBe('function');
            });

            it('creates FETCH_TOPIC_ARTICLES_SUCCESS when fetching topic articles has completed successfully', () => {
                moxios.stubRequest(`${ROOT}/topics/id/articles`,
                    {
                        status: 200,
                        response: { articles: ['topicArticles'] }
                    }
                );

                const expectedActions = [
                    { type: types.FETCH_TOPIC_ARTICLES_REQUEST },
                    { type: types.FETCH_TOPIC_ARTICLES_SUCCESS, data: ['topicArticles'] }
                ];
                const store = mockStore({ topicArticles: [] });

                return store.dispatch(actions.fetchTopicArticles('id'))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });

            it('creates FETCH_ARTICLES_ERROR when fetching articles is unsuccessful', () => {
                moxios.stubRequest(`${ROOT}/topics/id/articles`, { status: 400 });
                const expectedActions = [
                    { type: types.FETCH_TOPIC_ARTICLES_REQUEST },
                    { type: types.FETCH_TOPIC_ARTICLES_ERROR, data: new Error('Request failed with status code 400') }
                ];
                const store = mockStore({ topicArticles: [] });

                return store.dispatch(actions.fetchTopicArticles('id'))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });
        });
        describe('#fetchTopicArticlesRequest', () => {
            it('is a function', () => {
                expect(typeof actions.fetchTopicArticlesRequest).toBe('function');
            });

            it('should return the expected action', function () {
                expect(actions.fetchTopicArticlesRequest()).toEqual({
                    type: types.FETCH_TOPIC_ARTICLES_REQUEST
                });
            });
        });

        describe('#fetchTopicArticlesSuccess', () => {
            it('is a function', () => {
                expect(typeof actions.fetchTopicArticlesSuccess).toBe('function');
            });

            it('should the expected action', function () {
                expect(actions.fetchTopicArticlesSuccess(['topicArticles'])).toEqual({
                    type: types.FETCH_TOPIC_ARTICLES_SUCCESS,
                    data: ['topicArticles']
                });
            });
        });

        describe('#fetchTopicArticlesError', () => {
            it('is a function', () => {
                expect(typeof actions.fetchTopicArticlesError).toBe('function');
            });

            it('returns the expected action', function () {
                expect(actions.fetchTopicArticlesError('err')).toEqual({
                    type: types.FETCH_TOPIC_ARTICLES_ERROR,
                    data: 'err'
                });
            });
        });
    });

    describe('#addComment', () => {
        describe('function', () => {
            beforeEach(function () {
                moxios.install();
            });

            afterEach(function () {
                moxios.uninstall();
            });

            it('is a function', () => {
                expect(typeof actions.addComment).toBe('function');
            });

            it('creates ADD_COMMENT_SUCCESS when fetching articles has completed successfully', () => {
                moxios.stubRequest(`${ROOT}/articles/id/comments`,
                    {
                        status: 201,
                        response: { comment: 'comment' }
                    }
                );

                const expectedActions = [
                    { type: types.ADD_COMMENT_REQUEST },
                    { type: types.ADD_COMMENT_SUCCESS, data: { comment: 'comment' } }
                ];
                const store = mockStore({ comments: {} });

                return store.dispatch(actions.addComment('comment', 'id'))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });

            it('tries posting twice when an error is thrown', () => {
                moxios.stubRequest(`${ROOT}/articles/id/comments`, { status: 404, data: new Error('Request failed with status code 404') });
                const expectedActions = [
                    { type: types.ADD_COMMENT_REQUEST },
                    { type: types.ADD_COMMENT_REQUEST }
                ];
                const store = mockStore({ data: {} });

                return store.dispatch(actions.addComment('comment', 'id'))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });
        });
        describe('#addCommentRequest', () => {
            it('is a function', () => {
                expect(typeof actions.addCommentRequest).toBe('function');
            });

            it('should return the expected action', function () {
                expect(actions.addCommentRequest()).toEqual({
                    type: types.ADD_COMMENT_REQUEST
                });
            });
        });

        describe('#addCommentSuccess', () => {
            it('is a function', () => {
                expect(typeof actions.addCommentSuccess).toBe('function');
            });

            it('should the expected action', function () {
                expect(actions.addCommentSuccess({ savedComment: 'savedComment' })).toEqual({
                    type: types.ADD_COMMENT_SUCCESS,
                    data: { savedComment: 'savedComment' }
                });
            });
        });

        describe('#addCommentError', () => {
            it('is a function', () => {
                expect(typeof actions.addCommentError).toBe('function');
            });

            it('returns the expected action', function () {
                expect(actions.addCommentError('err')).toEqual({
                    type: types.ADD_COMMENT_ERROR,
                    data: 'err'
                });
            });
        });
    });

    describe('#deleteComment', () => {
        describe('function', () => {
            beforeEach(function () {
                moxios.install();
            });

            afterEach(function () {
                moxios.uninstall();
            });

            it('is a function', () => {
                expect(typeof actions.deleteComment).toBe('function');
            });

            it('creates DELETE_COMMENT_SUCCESS when deleting the comment has completed successfully', () => {
                moxios.stubRequest(`${ROOT}/comments/id`,
                    {
                        status: 200,
                        response: { comment: 'comment' }
                    }
                );

                const expectedActions = [
                    { type: types.DELETE_COMMENT_REQUEST },
                    { type: types.DELETE_COMMENT_SUCCESS, data: { comment: 'comment' } }
                ];
                const store = mockStore({ comments: [] });

                return store.dispatch(actions.deleteComment('id'))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });

            it('tries deleting twice when an error is thrown', () => {
                moxios.stubRequest(`${ROOT}/comments/id`, { status: 400 });
                const expectedActions = [
                    { type: types.DELETE_COMMENT_REQUEST },
                    { type: types.DELETE_COMMENT_REQUEST }
                ];
                const store = mockStore({ comments: [] });

                return store.dispatch(actions.deleteComment('id'))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });
        });
        describe('#deleteCommentRequest', () => {
            it('is a function', () => {
                expect(typeof actions.deleteCommentRequest).toBe('function');
            });

            it('should return the expected action', function () {
                expect(actions.deleteCommentRequest()).toEqual({
                    type: types.DELETE_COMMENT_REQUEST
                });
            });
        });

        describe('#deleteCommentSuccess', () => {
            it('is a function', () => {
                expect(typeof actions.deleteCommentSuccess).toBe('function');
            });

            it('should the expected action', function () {
                expect(actions.deleteCommentSuccess({ deletedComment: 'deletedComment' })).toEqual({
                    type: types.DELETE_COMMENT_SUCCESS,
                    data: { deletedComment: 'deletedComment' }
                });
            });
        });

        describe('#deleteCommentError', () => {
            it('is a function', () => {
                expect(typeof actions.deleteCommentError).toBe('function');
            });

            it('returns the expected action', function () {
                expect(actions.deleteCommentError('err')).toEqual({
                    type: types.DELETE_COMMENT_ERROR,
                    data: 'err'
                });
            });
        });
    });

    describe('#voteArticle', () => {
        describe('function', () => {
            beforeEach(function () {
                moxios.install();
            });

            afterEach(function () {
                moxios.uninstall();
            });

            it('is a function', () => {
                expect(typeof actions.voteArticle).toBe('function');
            });

            it('creates VOTE_ARTICLE_SUCCESS when the put request has completed successfully', () => {
                moxios.stubRequest(`${ROOT}/articles/id?vote=up`,
                    {
                        status: 200,
                        response: { article: 'article' }
                    }
                );

                const expectedActions = [
                    { type: types.VOTE_ARTICLE_REQUEST },
                    { type: types.VOTE_ARTICLE_SUCCESS, data: { article: 'article' } }
                ];
                const store = mockStore({ articles: [] });

                return store.dispatch(actions.voteArticle('up', 'id'))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });

            it('creates VOTE_ARTICLES_ERROR when the put request is unsuccessful', () => {
                moxios.stubRequest(`${ROOT}/articles/id?vote=up`, { status: 400 });
                const expectedActions = [
                    { type: types.VOTE_ARTICLE_REQUEST },
                    { type: types.VOTE_ARTICLE_ERROR, data: new Error('Request failed with status code 400') }
                ];
                const store = mockStore({ articles: [] });

                return store.dispatch(actions.voteArticle('up', 'id'))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });
        });
        describe('#voteArticleRequest', () => {
            it('is a function', () => {
                expect(typeof actions.voteArticleRequest).toBe('function');
            });

            it('should return the expected action', function () {
                expect(actions.voteArticleRequest()).toEqual({
                    type: types.VOTE_ARTICLE_REQUEST
                });
            });
        });

        describe('#voteArticleSuccess', () => {
            it('is a function', () => {
                expect(typeof actions.voteArticleSuccess).toBe('function');
            });

            it('should the expected action', function () {
                expect(actions.voteArticleSuccess({ votedArticle: 'votedArticle' })).toEqual({
                    type: types.VOTE_ARTICLE_SUCCESS,
                    data: { votedArticle: 'votedArticle' }
                });
            });
        });

        describe('#voteArticleError', () => {
            it('is a function', () => {
                expect(typeof actions.voteArticleError).toBe('function');
            });

            it('returns the expected action', function () {
                expect(actions.voteArticleError('err')).toEqual({
                    type: types.VOTE_ARTICLE_ERROR,
                    data: 'err'
                });
            });
        });
    });

    describe('#voteTopicArticle', () => {
        describe('function', () => {
            beforeEach(function () {
                moxios.install();
            });

            afterEach(function () {
                moxios.uninstall();
            });

            it('is a function', () => {
                expect(typeof actions.voteTopicArticle).toBe('function');
            });

            it('creates VOTE_TOPIC_ARTICLE_SUCCESS when the put request has completed successfully', () => {
                moxios.stubRequest(`${ROOT}/articles/id?vote=up`,
                    {
                        status: 200,
                        response: { article: 'article' }
                    }
                );

                const expectedActions = [
                    { type: types.VOTE_TOPIC_ARTICLE_REQUEST },
                    { type: types.VOTE_TOPIC_ARTICLE_SUCCESS, data: { article: 'article' } }
                ];
                const store = mockStore({ articles: [] });

                return store.dispatch(actions.voteTopicArticle('up', 'id'))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });

            it('creates VOTE_TOPIC_ARTICLE_ERROR when the put request is unsuccessful', () => {
                moxios.stubRequest(`${ROOT}/articles/id?vote=up`, { status: 400 });
                const expectedActions = [
                    { type: types.VOTE_TOPIC_ARTICLE_REQUEST },
                    { type: types.VOTE_TOPIC_ARTICLE_ERROR, data: new Error('Request failed with status code 400') }
                ];
                const store = mockStore({ articles: [] });

                return store.dispatch(actions.voteTopicArticle('up', 'id'))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });
        });
        describe('#voteTopicArticleRequest', () => {
            it('is a function', () => {
                expect(typeof actions.voteTopicArticleRequest).toBe('function');
            });

            it('should return the expected action', function () {
                expect(actions.voteTopicArticleRequest()).toEqual({
                    type: types.VOTE_TOPIC_ARTICLE_REQUEST
                });
            });
        });

        describe('#voteTopicArticleSuccess', () => {
            it('is a function', () => {
                expect(typeof actions.voteTopicArticleSuccess).toBe('function');
            });

            it('should the expected action', function () {
                expect(actions.voteTopicArticleSuccess({ votedArticle: 'votedArticle' })).toEqual({
                    type: types.VOTE_TOPIC_ARTICLE_SUCCESS,
                    data: { votedArticle: 'votedArticle' }
                });
            });
        });

        describe('#voteTopicArticleError', () => {
            it('is a function', () => {
                expect(typeof actions.voteTopicArticleError).toBe('function');
            });

            it('returns the expected action', function () {
                expect(actions.voteTopicArticleError('err')).toEqual({
                    type: types.VOTE_TOPIC_ARTICLE_ERROR,
                    data: 'err'
                });
            });
        });
    });

    describe('#fetchUsers', () => {
        describe('function', () => {
            beforeEach(function () {
                moxios.install();
            });

            afterEach(function () {
                moxios.uninstall();
            });

            it('is a function', () => {
                expect(typeof actions.fetchUsers).toBe('function');
            });

            it('creates FETCH_USERS_SUCCESS when fetching the users has completed successfully', () => {
                moxios.stubRequest(`${ROOT}/users`,
                    {
                        status: 200,
                        response: { users: ['users'] }
                    }
                );

                const expectedActions = [
                    { type: types.FETCH_USERS_REQUEST },
                    { type: types.FETCH_USERS_SUCCESS, data: { users: ['users'] } }
                ];
                const store = mockStore({ users: [] });

                return store.dispatch(actions.fetchUsers())
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });

            it('creates FETCH_USERS_ERROR when fetching the users is unsuccessful', () => {
                moxios.stubRequest(`${ROOT}/users`, { status: 400 });
                const expectedActions = [
                    { type: types.FETCH_USERS_REQUEST },
                    { type: types.FETCH_USERS_ERROR, data: new Error('Request failed with status code 400') }
                ];
                const store = mockStore({ users: [] });

                return store.dispatch(actions.fetchUsers())
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });
        });
        describe('#fetchUsersRequest', () => {
            it('is a function', () => {
                expect(typeof actions.fetchUsersRequest).toBe('function');
            });

            it('should return the expected action', function () {
                expect(actions.fetchUsersRequest()).toEqual({
                    type: types.FETCH_USERS_REQUEST
                });
            });
        });

        describe('#fetchUsersSuccess', () => {
            it('is a function', () => {
                expect(typeof actions.fetchUsersSuccess).toBe('function');
            });

            it('should the expected action', function () {
                expect(actions.fetchUsersSuccess({ users: 'users' })).toEqual({
                    type: types.FETCH_USERS_SUCCESS,
                    data: { users: 'users' }
                });
            });
        });

        describe('#fetchUsersError', () => {
            it('is a function', () => {
                expect(typeof actions.fetchUsersError).toBe('function');
            });

            it('returns the expected action', function () {
                expect(actions.fetchUsersError('err')).toEqual({
                    type: types.FETCH_USERS_ERROR,
                    data: 'err'
                });
            });
        });
    });

    describe('#fetchOneUser', () => {
        describe('function', () => {
            beforeEach(function () {
                moxios.install();
            });

            afterEach(function () {
                moxios.uninstall();
            });

            it('is a function', () => {
                expect(typeof actions.fetchOneUser).toBe('function');
            });

            it('creates FETCH_ONE_USER_SUCCESS when fetching the user has completed successfully', () => {
                moxios.stubRequest(`${ROOT}/users/id`,
                    {
                        status: 200,
                        response: { user: 'user' }
                    }
                );

                const expectedActions = [
                    { type: types.FETCH_ONE_USER_REQUEST },
                    { type: types.FETCH_ONE_USER_SUCCESS, data: { user: 'user' } }
                ];
                const store = mockStore({ oneUser: [] });

                return store.dispatch(actions.fetchOneUser('id'))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });

            it('creates FETCH_ONE_USER_ERROR when fetching the user is unsuccessful', () => {
                moxios.stubRequest(`${ROOT}/users/user`, { status: 400 });
                const expectedActions = [
                    { type: types.FETCH_ONE_USER_REQUEST },
                    { type: types.FETCH_ONE_USER_ERROR, data: new Error('Request failed with status code 400') }
                ];
                const store = mockStore({ oneUser: {} });

                return store.dispatch(actions.fetchOneUser('user'))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });
        });
        describe('#fetchOneUserRequest', () => {
            it('is a function', () => {
                expect(typeof actions.fetchOneUserRequest).toBe('function');
            });

            it('should return the expected action', function () {
                expect(actions.fetchOneUserRequest()).toEqual({
                    type: types.FETCH_ONE_USER_REQUEST
                });
            });
        });

        describe('#fetchOneUserSuccess', () => {
            it('is a function', () => {
                expect(typeof actions.fetchOneUserSuccess).toBe('function');
            });

            it('should the expected action', function () {
                expect(actions.fetchOneUserSuccess({ user: 'user' })).toEqual({
                    type: types.FETCH_ONE_USER_SUCCESS,
                    data: { user: 'user' }
                });
            });
        });

        describe('#fetchOneUserError', () => {
            it('is a function', () => {
                expect(typeof actions.fetchOneUserError).toBe('function');
            });

            it('returns the expected action', function () {
                expect(actions.fetchOneUserError('err')).toEqual({
                    type: types.FETCH_ONE_USER_ERROR,
                    data: 'err'
                });
            });
        });
    });

    describe('#voteComment', () => {
        describe('function', () => {
            beforeEach(function () {
                moxios.install();
            });

            afterEach(function () {
                moxios.uninstall();
            });

            it('is a function', () => {
                expect(typeof actions.voteComment).toBe('function');
            });

            it('creates VOTE_COMMENT_SUCCESS when the put request has completed successfully', () => {
                moxios.stubRequest(`${ROOT}/comments/id?vote=up`,
                    {
                        status: 200,
                        response: { comment: 'comment' }
                    }
                );

                const expectedActions = [
                    { type: types.VOTE_COMMENT_REQUEST },
                    { type: types.VOTE_COMMENT_SUCCESS, data: { comment: 'comment' } }
                ];
                const store = mockStore({ comments: [] });

                return store.dispatch(actions.voteComment('up', 'id'))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });

            it('creates VOTE_COMMENT_ERROR when the put request is unsuccessful', () => {
                moxios.stubRequest(`${ROOT}/comments/id?vote=up`, { status: 400 });
                const expectedActions = [
                    { type: types.VOTE_COMMENT_REQUEST },
                    { type: types.VOTE_COMMENT_ERROR, data: new Error('Request failed with status code 400') }
                ];
                const store = mockStore({ comments: [] });

                return store.dispatch(actions.voteComment('up', 'id'))
                    .then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
            });
        });
        describe('#voteCommentRequest', () => {
            it('is a function', () => {
                expect(typeof actions.voteCommentRequest).toBe('function');
            });

            it('should return the expected action', function () {
                expect(actions.voteCommentRequest()).toEqual({
                    type: types.VOTE_COMMENT_REQUEST
                });
            });
        });

        describe('#voteCommentSuccess', () => {
            it('is a function', () => {
                expect(typeof actions.voteCommentSuccess).toBe('function');
            });

            it('should the expected action', function () {
                expect(actions.voteCommentSuccess({ votedComment: 'votedComment' })).toEqual({
                    type: types.VOTE_COMMENT_SUCCESS,
                    data: { votedComment: 'votedComment' }
                });
            });
        });

        describe('#voteCommentError', () => {
            it('is a function', () => {
                expect(typeof actions.voteCommentError).toBe('function');
            });

            it('returns the expected action', function () {
                expect(actions.voteCommentError('err')).toEqual({
                    type: types.VOTE_COMMENT_ERROR,
                    data: 'err'
                });
            });
        });
    });
});