import React from 'react';
import PropTypes from 'prop-types';

import TopicNavBar from './TopicNavBar';
import MainBanner from './MainBanner';

class App extends React.Component {
  render () {
    return (
      <div>
        <TopicNavBar />
        <MainBanner />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
