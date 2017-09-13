import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Route, MemoryRouter } from 'react-router-dom';

const mockStore = configureStore();
const initialState = {
    topics: {
        loading: false,
        topics: [{
            _id: '59b04728371c52f1739aba0b',
            title: 'Football',
            slug: 'football',
            __v: 0
        },
        {
            _id: '59b04728371c52f1739aba0c',
            title: 'Cooking',
            slug: 'cooking',
            __v: 0
        },
        {
            _id: '59b04728371c52f1739aba0d',
            title: 'Cats',
            slug: 'cats',
            __v: 0
        }]
    }
};

import { ArticlePage } from '../../src/components/ArticlePage';

describe('ArticlePage', () => {
    const article = {
        _id: '59b01acf006c8dbca914672f',
        title: 'Football is fun',
        body: 'something',
        belongs_to: 'football',
        __v: 0,
        votes: 3,
        comment_count: 0
    };
    const articles = [{
        _id: '59b01acf006c8dbca914672f',
        title: 'Football is fun',
        body: 'something',
        belongs_to: 'football',
        __v: 0,
        votes: 3,
        comment_count: 0
    }];
    const user = {
        _id: '59b1b18b327cce1fb043bdb2',
        username: 'northcoder',
        name: 'Awesome Northcoder',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    };
    it('is a function', () => {
        expect(typeof ArticlePage).toEqual('function');
    });

    it('renders', () => {
        const store = mockStore(initialState);
        const enzymeWrapper = shallow(<ArticlePage
            store={store}
            article={article}
            articles={articles}
            match={
                {
                    params: {
                        id: '59b01acf006c8dbca914672f'
                    }
                }}
            user={user}
        />);
        expect(enzymeWrapper.children().length).toEqual(3);
    });

    /*it('renders correctly', () => {
        const store = mockStore(initialState);
        const tree = renderer.create(
            <Provider>
                <MemoryRouter>
                    <ArticlePage
                        article={article}
                        articles={articles}
                        user={user}
                        match={
                            {
                                params: {
                                    id: '59b01acf006c8dbca914672f'
                                }
                            }}
                        store={store} />
                </MemoryRouter>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });*/
});