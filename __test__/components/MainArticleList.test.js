import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import sinon from 'sinon';

const mockStore = configureStore();
const initialState = {};

import { MainArticleList } from '../../src/components/MainArticleList';

describe('MainArticleList', () => {
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

    it('is a function', () => {
        expect(typeof MainArticleList).toEqual('function');
    });

    it('renders', () => {
        const store = mockStore(initialState);
        const wrapper = shallow(<MainArticleList
            store={store}
            articles={articles}
            articlesLoading={false}
            fetchArticles={x => x}
            fetchUsers={x => x}
            voteArticle={x => x}
        />);
        expect(wrapper.children().length).toEqual(2);
    });

    it('renders correctly', () => {
        const store = mockStore(initialState);
        const renderer = new ReactShallowRenderer();
        const tree = renderer.render(
            <Provider store={store}>
                <MemoryRouter>
                    <MainArticleList
                        store={store}
                        articles={articles}
                        articlesLoading={false}
                        fetchArticles={x => x}
                        fetchUsers={x => x}
                        voteArticle={x => x} />
                </MemoryRouter>
            </Provider>
        );
        expect(tree).toMatchSnapshot();
    });

    it('has an initial state', () => {
        const wrapper = shallow(<MainArticleList
            articles={articles}
            articlesLoading={false}
            fetchArticles={x => x}
            fetchUsers={x => x}
            voteArticle={x => x}
        />);
        expect(wrapper.state('sortBy')).toBe('votes');
        expect(wrapper.state('showDropdown')).toBe(false);
        expect(wrapper.state('maximum')).toBe(10);
        expect(wrapper.state('voted')).toBe(false);
    });

    it('fetches users if the componentWillReceiveProps following a vote', () => {
        const spy = sinon.stub();
        const wrapper = shallow(<MainArticleList
            articles={articles}
            articlesLoading={false}
            fetchArticles={x => x}
            fetchUsers={spy}
            voteArticle={x => x}
        />);
        expect(spy.callCount).toBe(0);
        wrapper.setState({ voted: true });
        wrapper.setProps({ articles: articles });
        expect(spy.callCount).toBe(1);
        expect(wrapper.state('voted')).toBe(false);
        wrapper.setProps({ articles: articles });
        expect(spy.callCount).toBe(1);
    });

    it('displays a loading icon if this.props.articlesLoading', () => {
        const enzymeWrapperA = shallow(<MainArticleList
            articles={articles}
            articlesLoading={false}
            fetchArticles={x => x}
            fetchUsers={x => x}
            voteArticle={x => x}
        />);
        expect(enzymeWrapperA.find('.fa-spin').length).toBe(0);

        const enzymeWrapperB = shallow(<MainArticleList
            articles={articles}
            articlesLoading={true}
            fetchArticles={x => x}
            fetchUsers={x => x}
            voteArticle={x => x}
        />);
        expect(enzymeWrapperB.find('.fa-spin').length).toBe(1);
    });

    it('only displays the ArticleList component if this.props.articlesLoading === false', () => {
        const enzymeWrapperA = shallow(<MainArticleList
            articles={articles}
            articlesLoading={true}
            fetchArticles={x => x}
            fetchUsers={x => x}
            voteArticle={x => x}
        />);

        const enzymeWrapperB = shallow(<MainArticleList
            articles={articles}
            articlesLoading={false}
            fetchArticles={x => x}
            fetchUsers={x => x}
            voteArticle={x => x}
        />);
        expect(enzymeWrapperA.children().nodes[1].type.displayName).toBe(undefined);
        expect(enzymeWrapperB.children().nodes[1].type.displayName).toBe('Connect(ArticleList)');
    });
});