import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';

const mockStore = configureStore();
const initialState = {};

import { UserListCard } from '../../src/components/UserListCard';

describe('UserListCard', () => {
    const users = [{
        _id: '59b1b18b327cce1fb043bdb1',
        username: 'user1',
        name: 'One',
        comment_count: 10,
        articles_vote_count: 30,
        comments_vote_count: 20,
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }, {
        _id: '59b1b18b327cce1fb043bdb2',
        username: 'user2',
        name: 'Two',
        comment_count: 5,
        articles_vote_count: 41,
        comments_vote_count: 25,
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }, {
        _id: '59b1b18b327cce1fb043bdb3',
        username: 'user3',
        name: 'Three',
        comment_count: 15,
        articles_vote_count: 39,
        comments_vote_count: 30,
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }, {
        _id: '59b1b18b327cce1fb043bdb2',
        username: 'user4',
        name: 'Four',
        comment_count: 20,
        articles_vote_count: 60,
        comments_vote_count: 15,
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }];

    it('is a function', () => {
        expect(typeof UserListCard).toEqual('function');
    });

    it('renders', () => {
        const store = mockStore(initialState);
        const wrapper = shallow(<UserListCard
            users={users}
            fetchUsers={x => x}
            usersLoading={false}
            store={store}
        />);
        expect(wrapper.children().length).toEqual(1);
    });

    it('renders correctly', () => {
        const store = mockStore(initialState);
        const tree = renderer.create(
            <Provider store={store}>
                <MemoryRouter>
                    <UserListCard
                        users={users}
                        fetchUsers={x => x}
                        usersLoading={false}
                        store={store} />
                </MemoryRouter>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('has an initial state', () => {
        const wrapper = shallow(<UserListCard
            users={users}
            fetchUsers={x => x}
            usersLoading={false}
        />);
        expect(wrapper.state('showDropdown')).toBe(false);
        expect(wrapper.state('sortBy')).toBe('Sort by ranking');
    });

    it('fetches the users on componentDidMount if users is an empty array', () => {
        const spy = sinon.stub();
        mount(
            <MemoryRouter>
                <UserListCard
                    users={users}
                    fetchUsers={spy}
                    usersLoading={false}
                />
            </MemoryRouter>);
        expect(spy.callCount).toBe(0);
        mount(
            <MemoryRouter>
                <UserListCard
                    users={[]}
                    fetchUsers={spy}
                    usersLoading={false}
                />
            </MemoryRouter>);
        expect(spy.callCount).toBe(1);
    });

    it('sorts the users according to the dropdown if users is not an empty array', () => {
        const wrapper = shallow(<UserListCard
            users={users}
            fetchUsers={x => x}
            usersLoading={false}
        />);
        expect(wrapper.find('UserRankingCard').nodes[0].key).toBe('user4');
        expect(wrapper.find('UserRankingCard').nodes[1].key).toBe('user3');
        expect(wrapper.find('UserRankingCard').nodes[2].key).toBe('user2');
        expect(wrapper.find('UserRankingCard').nodes[3].key).toBe('user1');

        wrapper.setState({ sortBy: 'Sort by comments' });
        expect(wrapper.find('UserRankingCard').nodes[0].key).toBe('user4');
        expect(wrapper.find('UserRankingCard').nodes[1].key).toBe('user3');
        expect(wrapper.find('UserRankingCard').nodes[2].key).toBe('user1');
        expect(wrapper.find('UserRankingCard').nodes[3].key).toBe('user2');

        wrapper.setState({ sortBy: 'Sort by comment votes' });
        expect(wrapper.find('UserRankingCard').nodes[0].key).toBe('user3');
        expect(wrapper.find('UserRankingCard').nodes[1].key).toBe('user2');
        expect(wrapper.find('UserRankingCard').nodes[2].key).toBe('user1');
        expect(wrapper.find('UserRankingCard').nodes[3].key).toBe('user4');

        wrapper.setState({ sortBy: 'Sort by article votes' });
        expect(wrapper.find('UserRankingCard').nodes[0].key).toBe('user4');
        expect(wrapper.find('UserRankingCard').nodes[1].key).toBe('user2');
        expect(wrapper.find('UserRankingCard').nodes[2].key).toBe('user3');
        expect(wrapper.find('UserRankingCard').nodes[3].key).toBe('user1');

        wrapper.setState({ sortBy: 'Sort by ranking' });
        expect(wrapper.find('UserRankingCard').nodes[0].key).toBe('user4');
        expect(wrapper.find('UserRankingCard').nodes[1].key).toBe('user3');
        expect(wrapper.find('UserRankingCard').nodes[2].key).toBe('user2');
        expect(wrapper.find('UserRankingCard').nodes[3].key).toBe('user1');
    });

    it('adds the class is-active to "Sort by ranking" if sortBy is "Sort by ranking"', () => {
        const wrapper = shallow(<UserListCard
            users={users}
            fetchUsers={x => x}
            usersLoading={false}
        />);
        expect(wrapper.find('.ranking').nodes[0].props.className).toBe('dropdown-item ranking is-active');
        expect(wrapper.find('.comments').nodes[0].props.className).toBe('dropdown-item comments ');
        expect(wrapper.find('.comment-votes').nodes[0].props.className).toBe('dropdown-item comment-votes ');
        expect(wrapper.find('.article-votes').nodes[0].props.className).toBe('dropdown-item article-votes ');
    });

    it('adds the class is-active to "Sort by comments" if sortBy is "Sort by comments"', () => {
        const wrapper = shallow(<UserListCard
            users={users}
            fetchUsers={x => x}
            usersLoading={false}
        />);
        wrapper.setState({ sortBy: 'Sort by comments' });
        expect(wrapper.find('.ranking').nodes[0].props.className).toBe('dropdown-item ranking ');
        expect(wrapper.find('.comments').nodes[0].props.className).toBe('dropdown-item comments is-active');
        expect(wrapper.find('.comment-votes').nodes[0].props.className).toBe('dropdown-item comment-votes ');
        expect(wrapper.find('.article-votes').nodes[0].props.className).toBe('dropdown-item article-votes ');
    });

    it('adds the class is-active to "Sort by comment votes" if sortBy is "Sort by comment votes"', () => {
        const wrapper = shallow(<UserListCard
            users={users}
            fetchUsers={x => x}
            usersLoading={false}
        />);
        wrapper.setState({ sortBy: 'Sort by comment votes' });
        expect(wrapper.find('.ranking').nodes[0].props.className).toBe('dropdown-item ranking ');
        expect(wrapper.find('.comments').nodes[0].props.className).toBe('dropdown-item comments ');
        expect(wrapper.find('.comment-votes').nodes[0].props.className).toBe('dropdown-item comment-votes is-active');
        expect(wrapper.find('.article-votes').nodes[0].props.className).toBe('dropdown-item article-votes ');
    });

    it('adds the class is-active to "Sort by article votes" if sortBy is "Sort by article votes"', () => {
        const wrapper = shallow(<UserListCard
            users={users}
            fetchUsers={x => x}
            usersLoading={false}
        />);
        wrapper.setState({ sortBy: 'Sort by article votes' });
        expect(wrapper.find('.ranking').nodes[0].props.className).toBe('dropdown-item ranking ');
        expect(wrapper.find('.comments').nodes[0].props.className).toBe('dropdown-item comments ');
        expect(wrapper.find('.comment-votes').nodes[0].props.className).toBe('dropdown-item comment-votes ');
        expect(wrapper.find('.article-votes').nodes[0].props.className).toBe('dropdown-item article-votes is-active');
    });

    it('changes the dropdown to is-active if this.state.showDropdown', () => {
        const wrapper = shallow(<UserListCard
            users={users}
            fetchUsers={x => x}
            usersLoading={false}
        />);
        expect(wrapper.find('.dropdown').nodes[0].props.className).toBe('dropdown ');
        wrapper.setState({ showDropdown: true });
        expect(wrapper.find('.dropdown').nodes[0].props.className).toBe('dropdown is-active');
    });

    it('triggers the sortUserList function, which changes the state, if the Sort by ranking is clicked', () => {
        const wrapper = shallow(<UserListCard
            users={users}
            fetchUsers={x => x}
            usersLoading={false}
        />);
        wrapper.setState({ sortBy: 'Sort by article votes' });
        expect(wrapper.state('sortBy')).toBe('Sort by article votes');

        wrapper.find('.ranking').simulate('click', { preventDefault() { }, target: { innerText: 'Sort by ranking' } });
        expect(wrapper.state('sortBy')).toBe('Sort by ranking');
    });

    it('triggers the sortUserList function, which changes the state, if the Sort by comments is clicked', () => {
        const wrapper = shallow(<UserListCard
            users={users}
            fetchUsers={x => x}
            usersLoading={false}
        />);
        expect(wrapper.state('sortBy')).toBe('Sort by ranking');

        wrapper.find('.comments').simulate('click', { preventDefault() { }, target: { innerText: 'Sort by comments' } });
        expect(wrapper.state('sortBy')).toBe('Sort by comments');
    });

    it('triggers the sortUserList function, which changes the state, if the Sort by comment votes is clicked', () => {
        const wrapper = shallow(<UserListCard
            users={users}
            fetchUsers={x => x}
            usersLoading={false}
        />);
        expect(wrapper.state('sortBy')).toBe('Sort by ranking');

        wrapper.find('.comment-votes').simulate('click', { preventDefault() { }, target: { innerText: 'Sort by comment votes' } });
        expect(wrapper.state('sortBy')).toBe('Sort by comment votes');
    });

    it('triggers the sortUserList function, which changes the state, if the Sort by article votes is clicked', () => {
        const wrapper = shallow(<UserListCard
            users={users}
            fetchUsers={x => x}
            usersLoading={false}
        />);
        expect(wrapper.state('sortBy')).toBe('Sort by ranking');

        wrapper.find('.article-votes').simulate('click', { preventDefault() { }, target: { innerText: 'Sort by article votes' } });
        expect(wrapper.state('sortBy')).toBe('Sort by article votes');
    });

    it('triggers the toggleDropdown function, which changes the state and changes the class of the dropdown, if the cancel option is clicked', () => {
        const wrapper = shallow(<UserListCard
            users={users}
            fetchUsers={x => x}
            usersLoading={false}
        />);
        expect(wrapper.state('showDropdown')).toBe(false);
        expect(wrapper.find('.dropdown').nodes[0].props.className).toBe('dropdown ');

        wrapper.find('.dropdown-button').simulate('click');
        expect(wrapper.state('showDropdown')).toBe(true);
        expect(wrapper.find('.dropdown').nodes[0].props.className).toBe('dropdown is-active');

        wrapper.find('.cancel').simulate('click');
        expect(wrapper.state('showDropdown')).toBe(false);
        expect(wrapper.find('.dropdown').nodes[0].props.className).toBe('dropdown ');
    });

    it('shows a loading icon if usersLoading is true', () => {
        const wrapperA = shallow(<UserListCard
            users={users}
            fetchUsers={x => x}
            usersLoading={false}
        />);
        expect(wrapperA.find('.fa-spin').length).toBe(0);

        const wrapperB = shallow(<UserListCard
            users={users}
            fetchUsers={x => x}
            usersLoading={true}
        />);
        expect(wrapperB.find('.fa-spin').length).toBe(1);
    });

    it('renders the UserRankingCard component as many times as there are users in the array', () => {
        const wrapper = shallow(<UserListCard
            users={users}
            fetchUsers={x => x}
            usersLoading={false}
        />);
        expect(wrapper.find('UserRankingCard').length).toBe(4);
    });
});