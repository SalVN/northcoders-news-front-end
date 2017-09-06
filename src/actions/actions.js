import axios from 'axios';
import {ROOT} from '../../config';

import * as types from './types';

export function fetchArticles () {
    return function (dispatch) {
        dispatch(fetchArticlesRequest());
        axios.get(`${ROOT}/articles`)
        .then(res => {
            dispatch(fetchArticlesSuccess(res.data.articles));
        })
        .catch(err => {
            dispatch(fetchArticlesError(err));
        });
    };
}

export function fetchArticlesRequest () {
    return {
        type: types.FETCH_ARTICLES_REQUEST
    };
}

export function fetchArticlesSuccess (articles) {
    return {
        type: types.FETCH_ARTICLES_SUCCESS,
        data: articles
    };
}

export function fetchArticlesError (err) {
    return {
        type: types.FETCH_ARTICLES_ERROR,
        data: err
    };
}

export function fetchTopics () {
    return function (dispatch) {
        dispatch(fetchTopicsRequest());
        axios.get(`${ROOT}/topics`)
        .then(res => {
            dispatch(fetchTopicsSuccess(res.data.topics));
        })
        .catch(err => {
            dispatch(fetchTopicsError(err));
        });
    };
}

export function fetchTopicsRequest () {
    return {
        type: types.FETCH_TOPICS_REQUEST
    };
}

export function fetchTopicsSuccess (topics) {
    return {
        type: types.FETCH_TOPICS_SUCCESS,
        data: topics
    };
}

export function fetchTopicsError (err) {
    return {
        type: types.FETCH_TOPICS_ERROR,
        data: err
    };
}