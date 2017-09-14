import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore();
const initialState = {};

import { TopicNavBar } from '../../src/components/TopicNavBar';

describe('TopicNavBar', () => {
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
    const user = {
        _id: '59b1b18b327cce1fb043bdb1',
        username: 'northcoder',
        name: 'Awesome Northcoder',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    };
    it('is a function', () => {
        expect(typeof TopicNavBar).toEqual('function');
    });

    it('renders', () => {
        const store = mockStore(initialState);
        const wrapper = shallow(<TopicNavBar
            topics={topics}
            topicsLoading={false}
            userLoading={false}
            fetchTopics={x => x}
            fetchUser={x => x}
            user={user}
            store={store}
        />);
        expect(wrapper.children().length).toEqual(2);
        expect(wrapper.find('nav').length).toEqual(1);
    });

    it('renders correctly', () => {
        const store = mockStore(initialState);
        const tree = renderer.create(
            <Provider store={store}>
                <MemoryRouter>
                    <TopicNavBar
                        topics={topics}
                        topicsLoading={false}
                        userLoading={false}
                        fetchTopics={x => x}
                        fetchUser={x => x}
                        user={user}
                        store={store}
                    />
                </MemoryRouter>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});