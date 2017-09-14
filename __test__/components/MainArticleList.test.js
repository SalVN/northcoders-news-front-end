import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
// import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// import { MemoryRouter } from 'react-router-dom';

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

    /* it('renders correctly', () => {
        const store = mockStore(initialState);
        const tree = renderer.create(
            <Provider>
                <MemoryRouter>
                    <MainArticleList
                        articles={articles}
                        voteHandler={(x) => { return x; }}
                        users={users}
                        store={store} />
                </MemoryRouter>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });*/
});