import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';

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

    it('has an initial state', () => {
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
        expect(wrapper.state()).toEqual({ activeBurger: false });
    });

    it('fetches the topics and user on componentDidMount', () => {
        const spyTopics = sinon.stub();
        const spyUser = sinon.stub();
        const store = mockStore(initialState);
        mount(
            <MemoryRouter>
                <TopicNavBar
                    topics={topics}
                    topicsLoading={false}
                    userLoading={false}
                    fetchTopics={spyTopics}
                    fetchUser={spyUser}
                    user={user}
                    store={store}
                />
            </MemoryRouter>);
        expect(spyTopics.callCount).toBe(1);
        expect(spyUser.callCount).toBe(1);
    });

    it('changes the burger to "is-active" if this.state.activeBurger', () => {
        const enzymeWrapper = shallow(<TopicNavBar
            topics={topics}
            topicsLoading={false}
            userLoading={false}
            fetchTopics={x => x}
            fetchUser={x => x}
            user={user}
            store={x => x}
        />);
        expect(enzymeWrapper.find('.navbar-menu').node.props.className).toBe('navbar-menu ');
        enzymeWrapper.setState({ activeBurger: true });
        expect(enzymeWrapper.find('.navbar-menu').node.props.className).toBe('navbar-menu is-active');
    });

    it('contains two Links', () => {
        const enzymeWrapper = shallow(<TopicNavBar
            topics={topics}
            topicsLoading={false}
            userLoading={false}
            fetchTopics={x => x}
            fetchUser={x => x}
            user={user}
            store={x => x}
        />);
        expect(enzymeWrapper.find('Link').length).toBe(2);
    });

    it('contains three NavLinks', () => {
        const enzymeWrapper = shallow(<TopicNavBar
            topics={topics}
            topicsLoading={false}
            userLoading={false}
            fetchTopics={x => x}
            fetchUser={x => x}
            user={user}
            store={x => x}
        />);
        expect(enzymeWrapper.find('NavLink').length).toBe(3);
    });

    it('triggers the toggleBurger function when the navbar-burger is clicked', () => {
        const enzymeWrapper = shallow(<TopicNavBar
            topics={topics}
            topicsLoading={false}
            userLoading={false}
            fetchTopics={x => x}
            fetchUser={x => x}
            user={user}
            store={x => x}
        />);
        expect(enzymeWrapper.state('activeBurger')).toBe(false);
        enzymeWrapper.find('.burger').simulate('click');
        expect(enzymeWrapper.state('activeBurger')).toBe(true);
    });

    it('shows a loading icon if this.props.topicsLoading', () => {
        const enzymeWrapperA = shallow(<TopicNavBar
            topics={topics}
            topicsLoading={false}
            userLoading={false}
            fetchTopics={x => x}
            fetchUser={x => x}
            user={user}
        />);
        expect(enzymeWrapperA.find('.fa-spin').length).toBe(0);

        const enzymeWrapperB = shallow(<TopicNavBar
            topics={topics}
            topicsLoading={true}
            userLoading={false}
            fetchTopics={x => x}
            fetchUser={x => x}
            user={user}
            store={x => x}
        />);
        expect(enzymeWrapperB.find('.fa-spin').length).toBe(1);
    });

    it('shows a loading icon if this.props.userLoading', () => {
        const store = mockStore(initialState);
        const enzymeWrapperA = shallow(<TopicNavBar
            topics={topics}
            topicsLoading={false}
            userLoading={false}
            fetchTopics={x => x}
            fetchUser={x => x}
            user={user}
            store={x => x}
        />);
        expect(enzymeWrapperA.find('.fa-spin').length).toBe(0);

        const enzymeWrapperB = shallow(<TopicNavBar
            topics={topics}
            topicsLoading={false}
            userLoading={true}
            fetchTopics={x => x}
            fetchUser={x => x}
            user={user}
            store={x => x}
        />);
        expect(enzymeWrapperB.find('.fa-spin').length).toBe(1);
    });

    it('only renders the topics nav-links if topics is defined', () => {
        const enzymeWrapperA = shallow(<TopicNavBar
            topics={[]}
            topicsLoading={false}
            userLoading={false}
            fetchTopics={x => x}
            fetchUser={x => x}
            user={user}
        />);
        expect(enzymeWrapperA.find('NavLink').length).toBe(0);
    });

    it('renders the same number of NavLinks as there are topics in the array', () => {
        const enzymeWrapperA = shallow(<TopicNavBar
            topics={topics}
            topicsLoading={false}
            userLoading={false}
            fetchTopics={x => x}
            fetchUser={x => x}
            user={user}
        />);
        expect(enzymeWrapperA.find('NavLink').length).toBe(3);
    });
});