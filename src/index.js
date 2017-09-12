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
import MainArticleList from './components/MainArticleList';
import ArticlePage from './components/ArticlePage';
import TopicArticleList from './components/TopicArticleList';
import UserPage from './components/UserPage';
import PageNotFound from './components/PageNotFound';
import UserNotFound from './components/UserNotFound';
import reducer from './reducer/';

const store = createStore(reducer, applyMiddleware(thunk, logger));
const history = createBrowserHistory();

ReactDOM.render(<Provider store={store}>
  <Router history={history}>
    <App>
      <Switch>
        <Route exact path='/' component={MainArticleList} />
        <Route path='/articles/:id' component={ArticlePage} />
        <Route path='/topics/:id/articles' component={TopicArticleList} />
        <Route path='/users/not-found' component={UserNotFound}/>
        <Route path='/users/:id' component={UserPage} />
        <Route path='not-found' component={PageNotFound} />
        <Route component={PageNotFound}/>
      </Switch>
    </App>
  </Router>
</Provider>, document.getElementById('app'));
