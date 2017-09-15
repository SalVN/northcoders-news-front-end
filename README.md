## Northcoders News

Northcoders News is a social news aggregation, web content rating, and discussion website. It is similar to [Reddit](https://www.reddit.com/)

Northcoders News has articles which are divided into topics. Each article has user curated ratings and can be up or down voted using the API.
Users can also add comments about an article. Comments can also be up or down voted. A user can add comments and remove any comments which
they have added.
The user and comments list can be sorted by a range of options.

## Getting Started

To run this project in the browser, the [API](https://github.com/SalVN/w07-northcodersnews-api) should first be cloned and run.

To run the front end, the following steps should be taken:

### Prerequisites

This project requires nodejs and npm to be installed on your machine.

<b>Node</b>

To confirm you have Node installed on your machine, run the following code in the command line (Node v7.9.0 was used for this project).
```
node --version
```
If nodejs is not installed on your machine, it is available from <https://nodejs.org/en/download/>.

<b>npm</b>

To confirm you have npm installed locally, the following command line code can be used (npm 4.2.0 was used for this project).
```
npm -v
```

If you don't have npm installed on your machine, instructions for installing npm can be found at [https://www.npmjs.com/get-npm].

### Instructions

1. Install dependencies

After cloning the project into a new file from from [Github](https://github.com/SalVN/w10-northcoders-news), use npm or yarn to install the dependencies on your machine.

```
npm install
```

2. Start the webpack dev server

This project currently uses a [webpack dev server](https://webpack.github.io/docs/webpack-dev-server.html), which needs to be started to run the project.
```
npm run dev
```

3. Navigate to the correct page on your browser.

The project will run locally on 
```
localhost:9090/
```

## Functionality and Routes

The following routes can be used on the front-end to interact with the server:

<localhost:9090/> 
    displays a list of articles

<localhost:9090/topics/:topic-id/articles>
    displays a filtered list of articles about the topic

<localhost:9090/articles/:id>
    displays the featured article and related comments.
    The comments component allows you to add a comment to the page.

<localhost:9090/users/:username>
    displays key statistics about the user, as well as a list of articles they have contributed.

<localhost:9090/users>
    displays a list of users

## Test Suite

A test suite has been used to test some aspects of the reducer (the actions and reducer files).
The tests run on [Jest](https://facebook.github.io/jest/). The coverage tests provided with jest have been configured.

For the async actions testing for the redux reducer, [moxios](https://github.com/mzabriskie/moxios) has been used to mock the axios request for testing, alongside the [redux-mock-store](https://www.npmjs.com/package/redux-mock-store) to log the actions.

To test the react components, [enzyme](https://facebook.github.io/jest/) has been utilised alongside jest, as well as the [sinon.js stub function](http://sinonjs.org/).

To run the tests, use the following command in the terminal.
```
npm test
```

### Uses

To run this project, the [back-end](https://github.com/SalVN/w07-northcodersnews-api) server needs to be running.

Whilst a full list of dependencies is available on the package.json, the main libraries used are:

PROJECT
* [ReactJS](https://facebook.github.io/react/)
* [React Router](https://reacttraining.com/react-router/)
* [Redux](http://redux.js.org/) 
* [Underscore](http://underscorejs.org/)
* [Babel](https://babeljs.io/)
* [Webpack.JS](https://webpack.js.org/)
* [Axios](https://www.npmjs.com/package/axios)

TESTING
* [Jest](https://facebook.github.io/jest/)
* [Enzyme](https://facebook.github.io/jest/)
* [Moxios](https://github.com/mzabriskie/moxios)
* [Sinon](http://sinonjs.org/)
* [Redux Mock Store](https://www.npmjs.com/package/redux-mock-store)

### Authors

[Sally Newell](https://github.com/SalVN/)

### Acknowledgments

Completed as part of a project on the [Northcoders](https://northcoders.com/) Course.