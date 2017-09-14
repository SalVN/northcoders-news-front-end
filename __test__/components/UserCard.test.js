import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';

const mockStore = configureStore();
const initialState = {};

import { UserCard } from '../../src/components/UserCard';

describe('UserCard', () => {
    const user = {
        _id: '59b1b18b327cce1fb043bdb1',
        username: 'northcoder',
        name: 'Awesome Northcoder',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        comments_vote_count: 8,
        articles_vote_count: 5,
        __v: 0
    };

    it('is a function', () => {
        expect(typeof UserCard).toEqual('function');
    });

    it('renders', () => {
        const store = mockStore(initialState);
        const wrapper = shallow(<UserCard
            user={user}
            fetchUser={x => x}
            userLoading={false}
            store={store}
        />);
        expect(wrapper.children().length).toEqual(1);
    });

    it('renders correctly', () => {
        const store = mockStore(initialState);
        const tree = renderer.create(
            <Provider store={store}>
                <MemoryRouter>
                    <UserCard
                        user={user}
                        fetchUser={x => x}
                        userLoading={false}
                        store={store} />
                </MemoryRouter>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('fetches the user when the component mounts if user.username is undefined', () => {
        const spy = sinon.stub();
        const store = mockStore(initialState);
        mount(<MemoryRouter>
            <UserCard
                user={user}
                fetchUser={spy}
                userLoading={false}
                store={store} />
        </MemoryRouter>);
        expect(spy.callCount).toBe(0);

        mount(<MemoryRouter>
            <UserCard
                user={{}}
                fetchUser={spy}
                userLoading={false}
                store={store} />
        </MemoryRouter>);
        expect(spy.callCount).toBe(1);
    });

    it('renders a loading icon if userLoading === true', () => {
        const enzymeWrapperA = shallow(<UserCard
            user={{}}
            fetchUser={x => x}
            userLoading={false}
        />);
        expect(enzymeWrapperA.find('.fa-spin').length).toBe(0);

        const enzymeWrapperB = shallow(<UserCard
            user={{}}
            fetchUser={x => x}
            userLoading={true}
        />);
        expect(enzymeWrapperB.find('.fa-spin').length).toBe(1);
    });

    it('renders the links only if userLoading === false', () => {
        const enzymeWrapperA = shallow(<UserCard
            user={user}
            fetchUser={x => x}
            userLoading={true}
        />);
        expect(enzymeWrapperA.find('Link').length).toBe(0);

        const enzymeWrapperB = shallow(<UserCard
            user={user}
            fetchUser={x => x}
            userLoading={false}
        />);
        expect(enzymeWrapperB.find('Link').length).toBe(1);
    });

    it('calculates the popularity by finding the total votes of the user', () => {
        const wrapper = shallow(<UserCard
            user={user}
            fetchUser={x => x}
            userLoading={false}
        />);
        expect(wrapper.find('.total-vote').node.props.children).toBe(13);
    });
});