import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import ReactShallowRenderer from 'react-test-renderer/shallow';

const mockStore = configureStore();
const initialState = {
    comments: {
        comments: [],
        loading: false
    },
    oneUser: {
        oneUser: {
            _id: '59b1b18b327cce1fb043bdb1',
            username: 'northcoder',
            name: 'Awesome Northcoder',
            avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
            comments_vote_count: 8,
            articles_vote_count: 5,
            __v: 0
        },
        loading: false
    }
};

import { ArticlePage } from '../../src/components/ArticlePage';

describe('ArticlePage', () => {
    const articles = [{
        _id: '59b01acf006c8dbca914672f',
        title: 'Football is fun',
        body: 'something',
        belongs_to: 'football',
        __v: 0,
        votes: 3,
        comment_count: 0
    }];
    const users = [{
        _id: '59b1b18b327cce1fb043bdb2',
        username: 'northcoder',
        name: 'Awesome Northcoder',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }];
    it('is a function', () => {
        expect(typeof ArticlePage).toEqual('function');
    });

    it('renders', () => {
        const store = mockStore(initialState);
        const wrapper = shallow(<ArticlePage
            store={store}
            articles={articles}
            fetchArticles={x => x}
            match={
                {
                    params: {
                        id: '59b01acf006c8dbca914672f'
                    }
                }}
            users={users}
            fetchUsers={x => x}
            voteArticle={x => x}
            articlesLoading={false}
        />);
        expect(wrapper.children().length).toEqual(3);
    });

    it('renders correctly', () => {
        const store = mockStore(initialState);
        const renderer = new ReactShallowRenderer();
        const tree = renderer.render(
            <Provider store={store}>
                <MemoryRouter>
                    <ArticlePage
                        store={store}
                        articles={articles}
                        fetchArticles={x => x}
                        match={
                            {
                                params: {
                                    id: '59b01acf006c8dbca914672f'
                                }
                            }}
                        users={users}
                        fetchUsers={x => x}
                        voteArticle={x => x}
                        articlesLoading={false} />
                </MemoryRouter>
            </Provider>
        );
        expect(tree).toMatchSnapshot();
    });

    it('redirects if the article is not found', () => {
        const store = mockStore(initialState);
        const wrapperA = shallow(<ArticlePage
            store={store}
            articles={articles}
            fetchArticles={x => x}
            match={
                {
                    params: {
                        id: '59b01acf006c8dbca914672f'
                    }
                }}
            users={users}
            fetchUsers={x => x}
            voteArticle={x => x}
            articlesLoading={false}
        />);
        expect(wrapperA.find('Redirect').length).toEqual(0);

        const wrapperB = shallow(<ArticlePage
            store={store}
            articles={articles}
            fetchArticles={x => x}
            match={
                {
                    params: {
                        id: 'abc'
                    }
                }}
            users={users}
            fetchUsers={x => x}
            voteArticle={x => x}
            articlesLoading={false}
        />);
        expect(wrapperB.find('Redirect').length).toEqual(1);
    });

    it('renders a loading icon if this.props.articlesLoading', () => {
        const store = mockStore(initialState);
        const enzymeWrapperA = shallow(<ArticlePage
            store={store}
            articles={articles}
            fetchArticles={x => x}
            match={
                {
                    params: {
                        id: 'abc'
                    }
                }}
            users={users}
            fetchUsers={x => x}
            voteArticle={x => x}
            articlesLoading={false}
        />);
        expect(enzymeWrapperA.find('.fa-spin').length).toBe(0);

        const enzymeWrapperB = shallow(<ArticlePage
            store={store}
            articles={articles}
            fetchArticles={x => x}
            match={
                {
                    params: {
                        id: 'abc'
                    }
                }}
            users={users}
            fetchUsers={x => x}
            voteArticle={x => x}
            articlesLoading={true}
        />);
        expect(enzymeWrapperB.find('.fa-spin').length).toBe(1);
    });

    it('only renders the article if !this.props.articleLoading', () => {
        const store = mockStore(initialState);
        const enzymeWrapperA = shallow(<ArticlePage
            store={store}
            articles={articles}
            fetchArticles={x => x}
            match={
                {
                    params: {
                        id: '59b01acf006c8dbca914672f'
                    }
                }}
            users={users}
            fetchUsers={x => x}
            voteArticle={x => x}
            articlesLoading={false}
        />);
        expect(enzymeWrapperA.find('Article').length).toBe(1);

        const enzymeWrapperB = shallow(<ArticlePage
            store={store}
            articles={articles}
            fetchArticles={x => x}
            match={
                {
                    params: {
                        id: '59b01acf006c8dbca914672f'
                    }
                }}
            users={users}
            fetchUsers={x => x}
            voteArticle={x => x}
            articlesLoading={true}
        />);
        expect(enzymeWrapperB.find('Article').length).toBe(0);
    });
});