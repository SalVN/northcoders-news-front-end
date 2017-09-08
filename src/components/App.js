import React from 'react';
import PropTypes from 'prop-types';

import TopicNavBar from './TopicNavBar';
import MainBanner from './MainBanner';
import UserCard from './UserCard';

class App extends React.Component {
  render() {
    return (
      <div>
        <TopicNavBar />
        <MainBanner />
        <div className='columns'>
          <div className='column is-three-quarters'>
            {this.props.children}
          </div>
          <div className='column is-one-quarter'>
            <UserCard />
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
