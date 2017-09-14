import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';

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
    },
    {
        _id: '59b01acf006c8dbca914672g',
        title: 'Football is fun',
        body: 'something',
        belongs_to: 'football',
        created_by: 'northcoder',
        __v: 0,
        votes: 5,
        comment_count: 1
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
        const wrapper = shallow(<ArticleList
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
        expect(wrapper.children().length).toEqual(3);
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

    it('fetches the users on mount if users is an empty array', () => {
        const store = mockStore(initialState);
        const spy = sinon.stub();
        mount(
            <MemoryRouter>
                <ArticleList
                    store={store}
                    articles={articles}
                    usersLoading={false}
                    fetchUsers={spy}
                    voteArticle={x => x}
                    users={[]}
                    sortBy={'votes'}
                    maximum={2}
                    viewMoreArticles={x => x}
                />
            </MemoryRouter>
        );
        expect(spy.callCount).toBe(1);
    });

    it('sorts the articles if a sortBy prop is given', () => {
        const store = mockStore(initialState);
        const wrapperComments = shallow(
            <ArticleList
                store={store}
                articles={articles}
                usersLoading={false}
                fetchUsers={x => x}
                voteArticle={x => x}
                users={[]}
                sortBy={'comments'}
                maximum={3}
                viewMoreArticles={x => x}
            />);
        expect(wrapperComments.children().nodes[0].key).toBe('59b01acf006c8dbca914672e');
        expect(wrapperComments.children().nodes[1].key).toBe('59b01acf006c8dbca914672g');
        expect(wrapperComments.children().nodes[2].key).toBe('59b01acf006c8dbca914672f');

        const wrapperVotes = shallow(
            <ArticleList
                store={store}
                articles={articles}
                usersLoading={false}
                fetchUsers={x => x}
                voteArticle={x => x}
                users={[]}
                sortBy={'votes'}
                maximum={3}
                viewMoreArticles={x => x}
            />);
        expect(wrapperVotes.children().nodes[0].key).toBe('59b01acf006c8dbca914672g');
        expect(wrapperVotes.children().nodes[1].key).toBe('59b01acf006c8dbca914672f');
        expect(wrapperVotes.children().nodes[2].key).toBe('59b01acf006c8dbca914672e');
    });

    it('only renders up to the maximum number of articles', () => {
        const store = mockStore(initialState);
        const wrapperA = shallow(
            <ArticleList
                store={store}
                articles={articles}
                usersLoading={false}
                fetchUsers={x => x}
                voteArticle={x => x}
                users={[]}
                sortBy={'votes'}
                maximum={3}
                viewMoreArticles={x => x}
            />);
        expect(wrapperA.find('ArticleCard').length).toBe(3);

        const wrapperB = shallow(
            <ArticleList
                store={store}
                articles={articles}
                usersLoading={false}
                fetchUsers={x => x}
                voteArticle={x => x}
                users={[]}
                sortBy={'votes'}
                maximum={1}
                viewMoreArticles={x => x}
            />);
        expect(wrapperB.find('ArticleCard').length).toBe(1);
    });

    it('renders a loading spinner if usersLoading is given', () => {
        const store = mockStore(initialState);
        const wrapperA = shallow(
            <ArticleList
                store={store}
                articles={articles}
                usersLoading={true}
                fetchUsers={x => x}
                voteArticle={x => x}
                users={[]}
                sortBy={'votes'}
                maximum={3}
                viewMoreArticles={x => x}
            />);
        expect(wrapperA.find('.fa-spin').length).toBe(1);

        const wrapperB = shallow(
            <ArticleList
                store={store}
                articles={articles}
                usersLoading={false}
                fetchUsers={x => x}
                voteArticle={x => x}
                users={[]}
                sortBy={'votes'}
                maximum={3}
                viewMoreArticles={x => x}
            />);
        expect(wrapperB.find('.fa-spin').length).toBe(0);
    });

    it('will not render the articles if the article array is empty', () => {
        const store = mockStore(initialState);
        const wrapper = shallow(<ArticleList
            store={store}
            articles={[]}
            usersLoading={false}
            fetchUsers={x => x}
            voteArticle={x => x}
            users={users}
            sortBy={'votes'}
            maximum={2}
            viewMoreArticles={x => x}
        />);
        expect(wrapper.find('ArticleCard').length).toEqual(0);
    });

    it('shows the showMore button if the article array length is smaller than the maximum', () => {
        const store = mockStore(initialState);
        const enzymeWrapperA = shallow(<ArticleList
            store={store}
            articles={articles}
            usersLoading={false}
            fetchUsers={x => x}
            voteArticle={x => x}
            users={users}
            sortBy={'votes'}
            maximum={3}
            viewMoreArticles={x => x}
        />);
        expect(enzymeWrapperA.find('.show-more-button').length).toEqual(0);

        const enzymeWrapperB = shallow(<ArticleList
            store={store}
            articles={articles}
            usersLoading={false}
            fetchUsers={x => x}
            voteArticle={x => x}
            users={users}
            sortBy={'votes'}
            maximum={5}
            viewMoreArticles={x => x}
        />);
        expect(enzymeWrapperB.find('.show-more-button').length).toEqual(0);

        const enzymeWrapperC = shallow(<ArticleList
            store={store}
            articles={articles}
            usersLoading={false}
            fetchUsers={x => x}
            voteArticle={x => x}
            users={users}
            sortBy={'votes'}
            maximum={1}
            viewMoreArticles={x => x}
        />);
        expect(enzymeWrapperC.find('.show-more-button').length).toEqual(1);
    });
});