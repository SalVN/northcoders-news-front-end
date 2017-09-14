import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import sinon from 'sinon';

const mockStore = configureStore();
const initialState = {};

import { TopicArticleList } from '../../src/components/TopicArticleList';

describe('TopicArticleList', () => {
    const articles = [{
        _id: '59b01acf006c8dbca914672f',
        title: 'Football is fun',
        body: 'something',
        belongs_to: 'football',
        __v: 0,
        votes: 3,
        comment_count: 0
    },
    {
        _id: '59b01acf006c8dbca914672e',
        title: 'Cats are great',
        body: 'something',
        belongs_to: 'cats',
        __v: 0,
        votes: 2,
        comment_count: 2
    }];

    const topics = [{
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
    }];

    it('is a function', () => {
        expect(typeof TopicArticleList).toEqual('function');
    });

    it('renders', () => {
        const store = mockStore(initialState);
        const wrapper = shallow(<TopicArticleList
            store={store}
            topicArticles={articles}
            articlesLoading={false}
            fetchTopicArticles={x => x}
            match={{
                params: {
                    id: '59b01acf006c8dbca914672f'
                }
            }}
            voteArticle={x => x}
            topics={topics}
            fetchUsers={x => x}
        />);
        expect(wrapper.children().length).toEqual(2);
    });

    it('renders correctly', () => {
        const store = mockStore(initialState);
        const renderer = new ReactShallowRenderer();
        const tree = renderer.render(
            <Provider store={store}>
                <MemoryRouter>
                    <TopicArticleList
                        store={store}
                        topicArticles={articles}
                        articlesLoading={false}
                        fetchTopicArticles={x => x}
                        match={{
                            params: {
                                id: '59b01acf006c8dbca914672f'
                            }
                        }}
                        voteArticle={x => x}
                        topics={topics}
                        fetchUsers={x => x}
                    />
                </MemoryRouter>
            </Provider>
        );
        expect(tree).toMatchSnapshot();
    });

    it('has an initial state', () => {
        const wrapper = shallow(<TopicArticleList
            topicArticles={articles}
            articlesLoading={false}
            fetchTopicArticles={x => x}
            match={{
                params: {
                    id: 'football'
                }
            }}
            voteArticle={x => x}
            topics={topics}
            fetchUsers={x => x}
        />);
        expect(wrapper.state('sortBy')).toBe('votes');
        expect(wrapper.state('showDropdown')).toBe(false);
        expect(wrapper.state('maximum')).toBe(10);
        expect(wrapper.state('voted')).toBe(false);
    });

    it('fetches topic articles on componentWillReceiveProps if the :id does not match the old :id from the path', () => {
        const spy = sinon.stub();
        const wrapper = shallow(<TopicArticleList
            topicArticles={articles}
            articlesLoading={false}
            fetchTopicArticles={spy}
            match={{
                params: {
                    id: 'football'
                }
            }}
            voteArticle={x => x}
            topics={topics}
            fetchUsers={x => x}
        />);
        expect(spy.callCount).toBe(0);
        wrapper.setProps({ match: { params: { id: 'football' } } });
        expect(spy.callCount).toBe(0);
        wrapper.setProps({ match: { params: { id: 'coding' } } });
        expect(spy.callCount).toBe(1);
    });

    it('fetches users and updates the state if the component receives the props after voting', () => {
        const spy = sinon.stub();
        const wrapper = shallow(<TopicArticleList
            topicArticles={articles}
            articlesLoading={false}
            fetchTopicArticles={x => x}
            match={{
                params: {
                    id: 'football'
                }
            }}
            voteArticle={x => x}
            topics={topics}
            fetchUsers={spy}
        />);
        expect(spy.callCount).toBe(0);
        wrapper.setState({ voted: true });
        wrapper.setProps({ articles: articles });
        expect(spy.callCount).toBe(1);
        expect(wrapper.state('voted')).toBe(false);
        wrapper.setProps({ articles: articles });
        expect(spy.callCount).toBe(1);
    });

    it('redirects if there is a 404 error, if the slug does not match the params', () => {
        const wrapperA = shallow(<TopicArticleList
            topicArticles={articles}
            articlesLoading={false}
            fetchTopicArticles={x => x}
            match={{
                params: {
                    id: 'football'
                }
            }}
            voteArticle={x => x}
            error={{ response: { status: 404 } }}
            topics={topics}
            fetchUsers={x => x}
        />);
        expect(wrapperA.find('Redirect').length).toBe(0);
        const wrapperB = shallow(<TopicArticleList
            topicArticles={articles}
            articlesLoading={false}
            fetchTopicArticles={x => x}
            match={{
                params: {
                    id: 'hello'
                }
            }}
            voteArticle={x => x}
            error={{ response: { status: 404 } }}
            topics={topics}
            fetchUsers={x => x}
        />);
        expect(wrapperB.find('Redirect').length).toBe(1);

    });

    it('displays a loading icon if this.props.articlesLoading', () => {
        const enzymeWrapperA = shallow(<TopicArticleList
            topicArticles={articles}
            articlesLoading={false}
            fetchTopicArticles={x => x}
            match={{
                params: {
                    id: 'football'
                }
            }}
            voteArticle={x => x}
            topics={topics}
            fetchUsers={x => x}
        />);
        expect(enzymeWrapperA.find('.fa-spin').length).toBe(0);

        const enzymeWrapperB = shallow(<TopicArticleList
            topicArticles={articles}
            articlesLoading={true}
            fetchTopicArticles={x => x}
            match={{
                params: {
                    id: 'football'
                }
            }}
            voteArticle={x => x}
            topics={topics}
            fetchUsers={x => x}
        />);
        expect(enzymeWrapperB.find('.fa-spin').length).toBe(1);
    });

    it('only displays the ArticleList component if this.props.articlesLoading === false', () => {
        const enzymeWrapperA = shallow(<TopicArticleList
            topicArticles={articles}
            articlesLoading={true}
            fetchTopicArticles={x => x}
            match={{
                params: {
                    id: 'football'
                }
            }}
            voteArticle={x => x}
            topics={topics}
            fetchUsers={x => x}
        />);

        const enzymeWrapperB = shallow(<TopicArticleList
            topicArticles={articles}
            articlesLoading={false}
            fetchTopicArticles={x => x}
            match={{
                params: {
                    id: 'football'
                }
            }}
            voteArticle={x => x}
            topics={topics}
            fetchUsers={x => x}
        />);
        expect(enzymeWrapperA.children().nodes[1].type.displayName).toBe(undefined);
        expect(enzymeWrapperB.children().nodes[1].type.displayName).toBe('Connect(ArticleList)');
    });
});