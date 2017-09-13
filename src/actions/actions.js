import axios from 'axios';
import { ROOT } from '../../config';

import * as types from './types';

export function fetchArticles() {
    return function (dispatch) {
        dispatch(fetchArticlesRequest());
        return axios.get(`${ROOT}/articles`)
            .then(res => {
                dispatch(fetchArticlesSuccess(res.data.articles));
            })
            .catch(err => {
                dispatch(fetchArticlesError(err));
            });
    };
}

export function fetchArticlesRequest() {
    return {
        type: types.FETCH_ARTICLES_REQUEST
    };
}

export function fetchArticlesSuccess(articles) {
    return {
        type: types.FETCH_ARTICLES_SUCCESS,
        data: articles
    };
}

export function fetchArticlesError(err) {
    return {
        type: types.FETCH_ARTICLES_ERROR,
        data: err
    };
}

export function fetchTopics() {
    return function (dispatch) {
        dispatch(fetchTopicsRequest());
        return axios.get(`${ROOT}/topics`)
            .then(res => {
                dispatch(fetchTopicsSuccess(res.data.topics));
            })
            .catch(err => {
                dispatch(fetchTopicsError(err));
            });
    };
}

export function fetchTopicsRequest() {
    return {
        type: types.FETCH_TOPICS_REQUEST
    };
}

export function fetchTopicsSuccess(topics) {
    return {
        type: types.FETCH_TOPICS_SUCCESS,
        data: topics
    };
}

export function fetchTopicsError(err) {
    return {
        type: types.FETCH_TOPICS_ERROR,
        data: err
    };
}

export function fetchComments(id) {
    return function (dispatch) {
        dispatch(fetchCommentsRequest());
        axios.get(`${ROOT}/articles/${id}/comments`)
            .then(res => {
                dispatch(fetchCommentsSuccess(res.data.comments));
            })
            .catch(err => {
                dispatch(fetchCommentsError(err));
            });
    };
}

export function fetchCommentsRequest() {
    return {
        type: types.FETCH_COMMENTS_REQUEST
    };
}

export function fetchCommentsSuccess(comments) {
    return {
        type: types.FETCH_COMMENTS_SUCCESS,
        data: comments
    };
}

export function fetchCommentsError(err) {
    return {
        type: types.FETCH_COMMENTS_ERROR,
        data: err
    };
}


export function fetchTopicArticles(id) {
    return function (dispatch) {
        dispatch(fetchTopicArticlesRequest());
        axios.get(`${ROOT}/topics/${id}/articles`)
            .then(res => {
                dispatch(fetchTopicArticlesSuccess(res.data.articles));
            })
            .catch(err => {
                dispatch(fetchTopicArticlesError(err));
            });
    };
}

export function fetchTopicArticlesRequest() {
    return {
        type: types.FETCH_TOPIC_ARTICLES_REQUEST
    };
}

export function fetchTopicArticlesSuccess(topicArticles) {
    return {
        type: types.FETCH_TOPIC_ARTICLES_SUCCESS,
        data: topicArticles
    };
}

export function fetchTopicArticlesError(err) {
    return {
        type: types.FETCH_TOPIC_ARTICLES_ERROR,
        data: err
    };
}

export function addComment(data, id) {
    return function (dispatch) {
        dispatch(addCommentRequest());
        axios.post(`${ROOT}/articles/${id}/comments`, data)
            .then(res => {
                dispatch(addCommentSuccess(res.data));
            })
            .catch(err => {
                dispatch(addComment(err));
            });
    };
}

export function addCommentRequest() {
    return {
        type: types.ADD_COMMENT_REQUEST
    };
}

export function addCommentSuccess(comments) {
    return {
        type: types.ADD_COMMENT_SUCCESS,
        data: comments
    };
}

export function addCommentError(err) {
    return {
        type: types.ADD_COMMENT_ERROR,
        data: err
    };
}

export function deleteComment(id) {
    return function (dispatch) {
        dispatch(deleteCommentRequest());
        axios.delete(`${ROOT}/comments/${id}`)
            .then(res => {
                dispatch(deleteCommentSuccess(res.data));
            })
            .catch(err => {
                dispatch(deleteComment(err));
            });
    };
}

export function deleteCommentRequest() {
    return {
        type: types.DELETE_COMMENT_REQUEST
    };
}

export function deleteCommentSuccess(comment) {
    return {
        type: types.DELETE_COMMENT_SUCCESS,
        data: comment
    };
}

export function deleteCommentError(err) {
    return {
        type: types.DELETE_COMMENT_ERROR,
        data: err
    };
}


export function voteArticle(vote, id) {
    return function (dispatch) {
        dispatch(voteArticleRequest());
        axios.put(`${ROOT}/articles/${id}?vote=${vote}`)
            .then(res => {
                dispatch(voteArticleSuccess(res.data));
            })
            .catch(err => {
                dispatch(voteArticleError(err));
            });
    };
}

export function voteArticleRequest() {
    return {
        type: types.VOTE_ARTICLE_REQUEST
    };
}

export function voteArticleSuccess(article) {
    return {
        type: types.VOTE_ARTICLE_SUCCESS,
        data: article
    };
}

export function voteArticleError(err) {
    return {
        type: types.VOTE_ARTICLE_ERROR,
        data: err
    };
}


export function voteTopicArticle(vote, id) {
    return function (dispatch) {
        dispatch(voteTopicArticleRequest());
        axios.put(`${ROOT}/articles/${id}?vote=${vote}`)
            .then(res => {
                dispatch(voteTopicArticleSuccess(res.data));
            })
            .catch(err => {
                dispatch(voteTopicArticleError(err));
            });
    };
}

export function voteTopicArticleRequest() {
    return {
        type: types.VOTE_TOPIC_ARTICLE_REQUEST
    };
}

export function voteTopicArticleSuccess(article) {
    return {
        type: types.VOTE_TOPIC_ARTICLE_SUCCESS,
        data: article
    };
}

export function voteTopicArticleError(err) {
    return {
        type: types.VOTE_TOPIC_ARTICLE_ERROR,
        data: err
    };
}

export function fetchUsers() {
    return function (dispatch) {
        dispatch(fetchUsersRequest());
        axios.get(`${ROOT}/users`)
            .then(res => {
                dispatch(fetchUsersSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchUsersError(err));
            });
    };
}

export function fetchUsersRequest() {
    return {
        type: types.FETCH_USERS_REQUEST
    };
}

export function fetchUsersSuccess(userList) {
    return {
        type: types.FETCH_USERS_SUCCESS,
        data: userList
    };
}

export function fetchUsersError(err) {
    return {
        type: types.FETCH_USERS_ERROR,
        data: err
    };
}

export function fetchOneUser(username) {
    return function (dispatch) {
        dispatch(fetchOneUserRequest());
        axios.get(`${ROOT}/users/${username}`)
            .then(res => {
                dispatch(fetchOneUserSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchOneUserError(err));
            });
    };
}

export function fetchOneUserRequest() {
    return {
        type: types.FETCH_ONE_USER_REQUEST
    };
}

export function fetchOneUserSuccess(userList) {
    return {
        type: types.FETCH_ONE_USER_SUCCESS,
        data: userList
    };
}

export function fetchOneUserError(err) {
    return {
        type: types.FETCH_ONE_USER_ERROR,
        data: err
    };
}

export function voteComment(vote, id) {
    return function (dispatch) {
        dispatch(voteCommentRequest());
        axios.put(`${ROOT}/comments/${id}?vote=${vote}`)
            .then(res => {
                dispatch(voteCommentSuccess(res.data));
            })
            .catch(err => {
                dispatch(voteCommentError(err));
            });
    };
}

export function voteCommentRequest() {
    return {
        type: types.VOTE_COMMENT_REQUEST
    };
}

export function voteCommentSuccess(comment) {
    return {
        type: types.VOTE_COMMENT_SUCCESS,
        data: comment
    };
}

export function voteCommentError(err) {
    return {
        type: types.VOTE_COMMENT_ERROR,
        data: err
    };
}