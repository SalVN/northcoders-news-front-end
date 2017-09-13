import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore();
const initialState = {};

import { ArticleList } from '../../src/components/ArticleList';

describe('ArticleList', () => {
    const articles = [{
        _id: '59b01acf006c8dbca914672f',
        title: 'Football is fun',
        body: 'something',
        belongs_to: 'football',
        created_by: 'northcoder',
        __v: 0,
        votes: 3,
        comment_count: 0
    },
    {
        _id: '59b01acf006c8dbca914672e',
        title: 'Cats are great',
        body: 'something',
        belongs_to: 'cats',
        created_by: 'northcoder',
        __v: 0,
        votes: 2,
        comment_count: 2
    }];

    const users = [{
        _id: '59b1b18b327cce1fb043bdb1',
        username: 'northcoder',
        name: 'Awesome Northcoder',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }, {
        _id: '59b1b18b327cce1fb043bdb2',
        username: 'javascripter',
        name: 'Awesome Javascripter',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }];

    it('is a function', () => {
        expect(typeof ArticleList).toEqual('function');
    });

    it('renders', () => {
        const store = mockStore(initialState);
        const enzymeWrapper = shallow(<ArticleList
            store={store}
            articles={articles}
            usersLoading={false}
            fetchUsers={x => x}
            voteArticle={x => x}
            users={users}
            sortBy={'votes'}
            maximum={2}
            viewMoreArticles={x => x}
        />);
        expect(enzymeWrapper.children().length).toEqual(3);
    });

    it('renders correctly', () => {
        const store = mockStore(initialState);
        const tree = renderer.create(
            <Provider store={store}>
                <MemoryRouter>
                    <ArticleList
                        store={store}
                        articles={articles}
                        usersLoading={false}
                        fetchUsers={x => x}
                        voteArticle={x => x}
                        users={users}
                        sortBy={'votes'}
                        maximum={2}
                        viewMoreArticles={x => x}
                    />
                </MemoryRouter>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});