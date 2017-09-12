import React from 'react';
import PropTypes from 'prop-types';

import './css/App.css';
import TopicNavBar from './TopicNavBar';
import MainBanner from './MainBanner';
import UserCard from './UserCard';
import UserListCard from './UserListCard';

class App extends React.Component {
  render() {
  let pageStyling = window.innerWidth < 700 ? 'main-page-mobile' : 'main-page';
    return (
      <div className='page'>
        <TopicNavBar />
        <MainBanner />
        <div className={`columns ${pageStyling}`}>
          <div className='column is-three-quarters'>
            {this.props.children}
          </div>
          <div className='column is-one-quarter'>
            <UserCard />
            <UserListCard />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
