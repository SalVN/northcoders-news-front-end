import {combineReducers} from 'redux';
import articlesReducer from './articles.reducer.js';
import topicsReducer from './topics.reducer.js';
import commentsReducer from './comments.reducer.js';

export default combineReducers({
    articles: articlesReducer,
    topics: topicsReducer,
    comments: commentsReducer
});