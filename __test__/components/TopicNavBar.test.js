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

import { TopicNavBar } from '../../src/components/TopicNavBar';

describe('TopicNavBar', () => {
    it('is a function', () => {
        expect(typeof TopicNavBar).toEqual('function');
    });

    it('renders', () => {
        const store = mockStore(initialState);
        const enzymeWrapper = shallow(<TopicNavBar store={store} />);
        expect(enzymeWrapper.children().length).toEqual(2);
        expect(enzymeWrapper.find('nav').length).toEqual(1);
    });

    it('renders correctly', () => {
        const store = mockStore(initialState);
        const tree = renderer.create(
            <Provider>
                <MemoryRouter>
                    <TopicNavBar 
                    fetchTopics={(x) => { return x; }}
                    fetchUser={(x) => { return x; }}
                    store={store} />
                </MemoryRouter>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});