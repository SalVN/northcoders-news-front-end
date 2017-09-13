import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Route, MemoryRouter } from 'react-router-dom';

const mockStore = configureStore();
const initialState = {};

import { UserPage } from '../../src/components/UserPage';

describe('UserPage', () => {
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
        expect(typeof UserPage).toEqual('function');
    });

    it('renders', () => {
        const store = mockStore(initialState);
        const enzymeWrapper = shallow(<UserPage
            users={users}
            match={
                {
                    params: {
                        id: '59b01acf006c8dbca914672f'
                    }
                }}
            fetchArticles={x => x}
            store={store}
        />);
        expect(enzymeWrapper.children().length).toEqual(4);
    });

    it('renders correctly', () => {
        const store = mockStore(initialState);
        const tree = renderer.create(
            <Provider>
                <MemoryRouter>
                    <UserPage
                        users={users}
                        match={
                            {
                                params: {
                                    id: '59b01acf006c8dbca914672f'
                                }
                            }}
                        fetchArticles={x => x}
                        store={store} />
                </MemoryRouter>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});