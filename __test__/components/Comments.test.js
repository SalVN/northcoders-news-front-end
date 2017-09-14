import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';

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

    it('fetches comments when the component mounts', () => {
        const spy = sinon.stub();
        const store = mockStore(initialState);
        mount(
            <MemoryRouter>
                <Comments
                    store={store}
                    id={comments[0]._id}
                    comments={comments}
                    users={users}
                    fetchComments={spy}
                    deleteComment={x => x}
                    voteComment={x => x}
                    fetchUser={x => x}
                    user={users[0]}
                    addComment={x => x}
                    fetchUsers={x => x}
                    commentsLoading={false}
                />
            </MemoryRouter>);
        expect(spy.callCount).toBe(1);
    });

    it('fetches the user when the component mounts if the data is not currently held in state', () => {
        const spy = sinon.stub();
        const store = mockStore(initialState);
        mount(
            <MemoryRouter>
                <Comments
                    store={store}
                    id={comments[0]._id}
                    comments={comments}
                    users={users}
                    fetchComments={x => x}
                    deleteComment={x => x}
                    voteComment={x => x}
                    fetchUser={spy}
                    user={users[0]}
                    addComment={x => x}
                    fetchUsers={x => x}
                    commentsLoading={false}
                />
            </MemoryRouter>);
        expect(spy.callCount).toBe(0);
        mount(
            <MemoryRouter>
                <Comments
                    store={store}
                    id={comments[0]._id}
                    comments={comments}
                    users={users}
                    fetchComments={x => x}
                    deleteComment={x => x}
                    voteComment={x => x}
                    fetchUser={spy}
                    user={{}}
                    addComment={x => x}
                    fetchUsers={x => x}
                    commentsLoading={false}
                />
            </MemoryRouter>);
        expect(spy.callCount).toBe(1);
    });

    it('fetches users and user if a comment is added', () => {
        const store = mockStore(initialState);
        const spyUsers = sinon.stub();
        const spyUser = sinon.stub();
        const wrapper = shallow(
            <Comments
                store={store}
                id={comments[0]._id}
                comments={[]}
                users={users}
                fetchComments={x => x}
                deleteComment={x => x}
                voteComment={x => x}
                fetchUser={spyUser}
                user={users[0]}
                addComment={x => x}
                fetchUsers={spyUsers}
                commentsLoading={true}
            />);
        expect(spyUser.callCount).toBe(0);
        expect(spyUsers.callCount).toBe(0);
        wrapper.setProps({ comments: [comments] });
        expect(spyUser.callCount).toBe(1);
        expect(spyUsers.callCount).toBe(1);
    });

    it('fetches users and user if a vote is made', () => {
        const store = mockStore(initialState);
        const spyUsers = sinon.stub();
        const spyUser = sinon.stub();
        const wrapper = shallow(
            <Comments
                store={store}
                id={comments[0]._id}
                comments={comments}
                users={users}
                fetchComments={x => x}
                deleteComment={x => x}
                voteComment={x => x}
                fetchUser={spyUser}
                user={users[0]}
                addComment={x => x}
                fetchUsers={spyUsers}
                commentsLoading={true}
            />);
        expect(spyUser.callCount).toBe(0);
        expect(spyUsers.callCount).toBe(0);
        wrapper.setState({ voted: true });
        wrapper.setProps({ comments: [comments] });
        expect(spyUser.callCount).toBe(1);
        expect(spyUsers.callCount).toBe(1);
    });

    it('has an initial state', () => {
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
        expect(wrapper.state('showForm')).toBe(false);
        expect(wrapper.state('added')).toBe(false);
        expect(wrapper.state('maximum')).toBe(8);
        expect(wrapper.state('voted')).toBe(false);
    });

    it('renders the number of comments if a comments array is passed in props, or 0 if not', () => {
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
        expect(wrapper.find('.comments-length').node.props.children).toBe('(3)');

        const wrapperNone = shallow(<Comments
            store={store}
            id={comments[0]._id}
            comments={null}
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
        expect(wrapperNone.find('.comments-length').node.props.children).toBe('(0)');
    });

    it('shows an added message if added is true in the state', () => {
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
        expect(wrapper.find('h3').length).toBe(0);
        wrapper.setState({ added: true });
        expect(wrapper.find('h3').node.props.children).toBe('Your comment has been added');
    });

    it('renders a loading spinner if usersLoading is given', () => {
        const store = mockStore(initialState);
        const wrapperA = shallow(
            <Comments
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
                commentsLoading={true}
            />);
        expect(wrapperA.find('.fa-spin').length).toBe(1);

        const wrapperB = shallow(
            <Comments
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
        expect(wrapperB.find('.fa-spin').length).toBe(0);
    });

    it('renders the AddCommentForm and CommentsList if commentsLoading === false', () => {
        const store = mockStore(initialState);
        const wrapperA = shallow(
            <Comments
                store={store}
                id={comments[0]._id}
                comments={[comments]}
                users={users}
                fetchComments={x => x}
                deleteComment={x => x}
                voteComment={x => x}
                fetchUser={x => x}
                user={users[0]}
                addComment={x => x}
                fetchUsers={x => x}
                commentsLoading={true}
            />);
        expect(wrapperA.find('AddCommentForm').length).toBe(0);
        expect(wrapperA.find('CommentsList').length).toBe(0);

        const wrapperB = shallow(
            <Comments
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
        expect(wrapperB.find('AddCommentForm').length).toBe(1);
        expect(wrapperB.find('CommentsList').length).toBe(1);
    });
});