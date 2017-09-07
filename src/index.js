import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import './css/bulma.css';
import './css/font-awesome.css';

import App from './components/App';
import ArticleList from './components/ArticleList';
import ArticlePage from './components/ArticlePage';
import TopicArticleList from './components/TopicArticleList';
import reducer from './reducer/';

const store = createStore(reducer, applyMiddleware(thunk, logger));
const history = createBrowserHistory();

ReactDOM.render(<Provider store={store}>
  <Router history={history}>
    <App>
      <Switch>
        <Route exact path='/' component={ArticleList} />
        <Route path='/articles/:id' component={ArticlePage} />
        <Route path='/topics/:id/articles' component={TopicArticleList} />
      </Switch>
    </App>
  </Router>
</Provider>, document.getElementById('app'));
