import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore();
const initialState = {};

import { Comments } from '../../src/components/Comments';

describe('Comments', () => {
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
    const comments = [{
        _id: '59b11ae18807841d9bf13234',
        body: 'this is a comment',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder',
        votes: 0,
        created_at: 1504778965845
    },
    {
        _id: '59b11ae18807841d9bf13235',
        body: 'this is another comment',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder',
        votes: 0,
        created_at: 1504778965845
    },
    {
        _id: '59b11ae18807841d9bf13236',
        body: 'this is my comment',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder',
        votes: 0,
        created_at: 1504778977306
    }];

    it('is a function', () => {
        expect(typeof Comments).toEqual('function');
    });

    it('renders', () => {
        const store = mockStore(initialState);
        const wrapper = shallow(<Comments
            store={store}
            id={comments[0]._id}
            comments={comments}
            users={users}
            fetchComments={x => x}
            deleteComment={x => x}
            voteComment={x => x}
            fetchUser={x => x}
            user={users[0]}
            addComment={x => x}
            fetchUsers={x => x}
            commentsLoading={false}
        />);
        expect(wrapper.children().length).toEqual(2);
    });

    it('renders correctly', () => {
        const store = mockStore(initialState);
        const tree = renderer.create(
            <Provider store={store}>
                <MemoryRouter>
                    <Comments
                        id={comments[0]._id}
                        comments={comments}
                        users={users}
                        fetchComments={x => x}
                        deleteComment={x => x}
                        voteComment={x => x}
                        fetchUser={x => x}
                        user={users[0]}
                        addComment={x => x}
                        fetchUsers={x => x}
                        commentsLoading={false}
                    />
                </MemoryRouter>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});