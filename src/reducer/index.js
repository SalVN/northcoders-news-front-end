import {combineReducers} from 'redux';
import articlesReducer from './articles.reducer.js';
import topicsReducer from './topics.reducer.js';
import commentsReducer from './comments.reducer.js';
import topicArticlesReducer from './topicArticles.reducer.js';
import usersReducer from './usersReducer.reducer.js';

export default combineReducers({
    articles: articlesReducer,
    topics: topicsReducer,
    comments: commentsReducer,
    topicArticles: topicArticlesReducer,
    users: usersReducer
});