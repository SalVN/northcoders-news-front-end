import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
// import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// import { MemoryRouter } from 'react-router-dom';

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

    /* it('renders correctly', () => {
        const store = mockStore(initialState);
        const tree = renderer.create(
            <Provider>
                <MemoryRouter>
                    <TopicArticleList
                        articles={articles}
                        voteHandler={(x) => { return x; }}
                        users={users}
                        match={{
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