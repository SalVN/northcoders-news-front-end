import {combineReducers} from 'redux';
import articlesReducer from './articles.reducer.js';

export default combineReducers({
    articles: articlesReducer,
});