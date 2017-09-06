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