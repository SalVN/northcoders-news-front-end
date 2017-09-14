import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';

const mockStore = configureStore();
const initialState = {};

import { UserPage } from '../../src/components/UserPage';

describe('UserPage', () => {
    const users = [{
        _id: '59b1b18b327cce1fb043bdb1',
        username: 'northcoder',
        name: 'Awesome Northcoder',
        comment_count: 5,
        articles_vote_count: 1,
        comments_vote_count: 1,
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }, {
        _id: '59b1b18b327cce1fb043bdb2',
        username: 'javascripter',
        name: 'Awesome Javascripter',
        comment_count: 6,
        articles_vote_count: 2,
        comments_vote_count: 2,
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }];

    const articles = [{
        _id: '59b01acf006c8dbca914672f',
        title: 'Football is fun',
        body: 'something',
        belongs_to: 'football',
        __v: 0,
        votes: 3,
        comment_count: 0,
    },
    {
        _id: '59b01acf006c8dbca914672e',
        title: 'Cats are great',
        body: 'something',
        belongs_to: 'cats',
        __v: 0,
        votes: 2,
        comment_count: 2,
    }];

    it('is a function', () => {
        expect(typeof UserPage).toEqual('function');
    });

    it('renders', () => {
        const store = mockStore(initialState);
        const wrapper = shallow(<UserPage
            users={users}
            fetchUsers={x => x}
            match={
                {
                    params: {
                        id: 'northcoder'
                    }
                }}
            fetchArticles={x => x}
            articles={articles}
            index={0}
            voteArticle={x => x}
            usersLoading={false}
            articlesLoading={false}
            store={store}
        />);
        expect(wrapper.children().length).toEqual(4);
    });

    it('renders correctly', () => {
        const store = mockStore(initialState);
        const tree = renderer.create(
            <Provider store={store}>
                <MemoryRouter>
                    <UserPage
                        users={users}
                        fetchUsers={x => x}
                        match={
                            {
                                params: {
                                    id: 'northcoder'
                                }
                            }}
                        fetchArticles={x => x}
                        articles={articles}
                        index={0}
                        voteArticle={x => x}
                        usersLoading={false}
                        articlesLoading={false}
                        store={store} />
                </MemoryRouter>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('has an initial state', () => {
        const store = mockStore(initialState);
        const wrapper = shallow(<UserPage
            users={users}
            fetchUsers={x => x}
            match={
                {
                    params: {
                        id: 'northcoder'
                    }
                }}
            fetchArticles={x => x}
            articles={articles}
            index={0}
            voteArticle={x => x}
            usersLoading={false}
            articlesLoading={false}
            store={store}
        />);
        expect(wrapper.state('articlesSortBy')).toBe('votes');
        expect(wrapper.state('articlesMaximum')).toBe(2);
        expect(wrapper.state('showDropdown')).toBe(false);
        expect(wrapper.state('voted')).toBe(false);
    });

    it('fetches users on componentDidMount if users is an empty array', () => {
        const store = mockStore(initialState);
        const spy = sinon.stub();
        mount(<Provider store={store}>
            <MemoryRouter>
                <UserPage
                    users={users}
                    fetchUsers={spy}
                    match={
                        {
                            params: {
                                id: 'northcoder'
                            }
                        }}
                    fetchArticles={x => x}
                    articles={articles}
                    index={0}
                    voteArticle={x => x}
                    usersLoading={false}
                    articlesLoading={false}
                    store={store} />
            </MemoryRouter>
        </Provider>);
        expect(spy.callCount).toBe(0);
        mount(<Provider store={store}>
            <MemoryRouter>
                <UserPage
                    users={[]}
                    fetchUsers={spy}
                    match={
                        {
                            params: {
                                id: 'northcoder'
                            }
                        }}
                    fetchArticles={x => x}
                    articles={articles}
                    index={0}
                    voteArticle={x => x}
                    usersLoading={false}
                    articlesLoading={false}
                    store={store} />
            </MemoryRouter>
        </Provider>);
        expect(spy.callCount).toBe(1);
    });

    it('fetches articles on componentDidMount if articles is an empty array', () => {
        const store = mockStore(initialState);
        const spy = sinon.stub();
        mount(<Provider store={store}>
            <MemoryRouter>
                <UserPage
                    users={users}
                    fetchUsers={x => x}
                    match={
                        {
                            params: {
                                id: 'northcoder'
                            }
                        }}
                    fetchArticles={spy}
                    articles={articles}
                    index={0}
                    voteArticle={x => x}
                    usersLoading={false}
                    articlesLoading={false}
                    store={store} />
            </MemoryRouter>
        </Provider>);
        expect(spy.callCount).toBe(0);
        mount(<Provider store={store}>
            <MemoryRouter>
                <UserPage
                    users={[]}
                    fetchUsers={x => x}
                    match={
                        {
                            params: {
                                id: 'northcoder'
                            }
                        }}
                    fetchArticles={spy}
                    articles={[]}
                    index={0}
                    voteArticle={x => x}
                    usersLoading={false}
                    articlesLoading={false}
                    store={store} />
            </MemoryRouter>
        </Provider>);
        expect(spy.callCount).toBe(1);
    });

    it('fetches users on componentWillReceiveProps if an article has been voted on', () => {
        const spy = sinon.stub();
        const store = mockStore(initialState);
        const wrapper = shallow(<UserPage
            users={users}
            fetchUsers={spy}
            match={
                {
                    params: {
                        id: 'northcoder'
                    }
                }}
            fetchArticles={x => x}
            articles={articles}
            index={0}
            voteArticle={x => x}
            usersLoading={false}
            articlesLoading={false}
            store={store}
        />);
        expect(spy.callCount).toBe(0);
        wrapper.setState({ voted: true });
        wrapper.setProps({ articles: articles });
        expect(spy.callCount).toBe(1);
        wrapper.setProps({ articles: articles });
        expect(spy.callCount).toBe(1);
    });

    it('sorts the articles according to ranking', () => {
        const spy = sinon.stub();
        const store = mockStore(initialState);
        const wrapper = mount(<Provider store={store}>
            <MemoryRouter>
                <UserPage
                    users={users}
                    fetchUsers={x => x}
                    match={
                        {
                            params: {
                                id: 'northcoder'
                            }
                        }}
                    fetchArticles={spy}
                    articles={articles}
                    index={0}
                    voteArticle={x => x}
                    usersLoading={false}
                    articlesLoading={false}
                    store={store} />
            </MemoryRouter>
        </Provider>);
        expect(wrapper.props().children.props.children.props.users[0].username).toBe('javascripter');
        expect(wrapper.props().children.props.children.props.users[1].username).toBe('northcoder');
    });

    it('only renders the articles created by the user', () => {
        const store = mockStore(initialState);
        const wrapper = shallow(<UserPage
            users={users}
            fetchUsers={x => x}
            match={
                {
                    params: {
                        id: 'northcoder'
                    }
                }}
            fetchArticles={x => x}
            articles={articles}
            index={0}
            voteArticle={x => x}
            usersLoading={false}
            articlesLoading={false}
            store={store}
        />);
        expect(wrapper.find('ArticleCard').length).toBe(0);
    });

    it('redirects if the user cannot be found', () => {
        const store = mockStore(initialState);
        const wrapper = shallow(<UserPage
            users={users}
            fetchUsers={x => x}
            match={
                {
                    params: {
                        id: 'user'
                    }
                }}
            fetchArticles={x => x}
            articles={articles}
            index={0}
            voteArticle={x => x}
            usersLoading={false}
            articlesLoading={false}
            store={store}
        />);
        expect(wrapper.find('Redirect').length).toBe(1);
        const wrapperNone = shallow(<UserPage
            users={users}
            fetchUsers={x => x}
            match={
                {
                    params: {
                        id: 'user'
                    }
                }}
            fetchArticles={x => x}
            articles={articles}
            index={0}
            voteArticle={x => x}
            usersLoading={false}
            articlesLoading={false}
            store={store}
        />);
        expect(wrapperNone.find('Redirect').length).toBe(1);
    });

    it('renders the loading icon if usersLoading is true', () => {
        const wrapperA = shallow(<UserPage
            users={users}
            fetchUsers={x => x}
            match={
                {
                    params: {
                        id: 'user'
                    }
                }}
            fetchArticles={x => x}
            articles={articles}
            index={0}
            voteArticle={x => x}
            usersLoading={false}
            articlesLoading={false}
        />);
        expect(wrapperA.find('.fa-spin').length).toBe(0);

        const wrapperB = shallow(<UserPage
            users={users}
            fetchUsers={x => x}
            match={
                {
                    params: {
                        id: 'user'
                    }
                }}
            fetchArticles={x => x}
            articles={articles}
            index={0}
            voteArticle={x => x}
            usersLoading={true}
            articlesLoading={false}
        />);
        expect(wrapperB.find('.fa-spin').length).toBe(1);
    });

    it('renders a loading icon if articlesLoading is true', () => {
        const wrapperA = shallow(<UserPage
            users={users}
            fetchUsers={x => x}
            match={
                {
                    params: {
                        id: 'user'
                    }
                }}
            fetchArticles={x => x}
            articles={articles}
            index={0}
            voteArticle={x => x}
            usersLoading={false}
            articlesLoading={false}
        />);
        expect(wrapperA.find('.fa-spin').length).toBe(0);

        const wrapperB = shallow(<UserPage
            users={users}
            fetchUsers={x => x}
            match={
                {
                    params: {
                        id: 'user'
                    }
                }}
            fetchArticles={x => x}
            articles={articles}
            index={0}
            voteArticle={x => x}
            usersLoading={false}
            articlesLoading={true}
        />);
        expect(wrapperB.find('.fa-spin').length).toBe(1);
    });

    it('renders "This user hasn\'t uploaded any articles yet" if the user has not uploaded any articles', () => {
        const wrapper = shallow(<UserPage
            users={users}
            fetchUsers={x => x}
            match={
                {
                    params: {
                        id: 'user'
                    }
                }}
            fetchArticles={x => x}
            articles={articles}
            index={0}
            voteArticle={x => x}
            usersLoading={false}
            articlesLoading={true}
        />);
        expect(wrapper.find('.user-page-no-articles').length).toBe(1);
    });
});