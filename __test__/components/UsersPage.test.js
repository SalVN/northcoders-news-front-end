import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';

import { UsersPage } from '../../src/components/UsersPage';

describe('UsersPage', () => {
    const users = [{
        _id: '59b1b18b327cce1fb043bdb1',
        username: 'northcoder1',
        name: 'One Northcoder',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }, {
        _id: '59b1b18b327cce1fb043bdb2',
        username: 'northcoder2',
        name: 'Two Northcoder',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }, {
        _id: '59b1b18b327cce1fb043bdb3',
        username: 'northcoder3',
        name: 'Three Northcoder',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }];
    it('is a function', () => {
        expect(typeof UsersPage).toEqual('function');
    });

    it('renders', () => {
        const wrapper = shallow(<UsersPage
            users={users}
            fetchUsers={x => x}
        />);
        expect(wrapper.children().length).toEqual(2);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <UsersPage
                    users={users}
                    fetchUsers={x => x}
                />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('fetches the users on componentDidMount if users is an empty array', () => {
        const spy = sinon.stub();
        mount(
            <MemoryRouter>
                <UsersPage
                    users={users}
                    fetchUsers={spy}
                />
            </MemoryRouter>);
        expect(spy.callCount).toBe(0);
        mount(
            <MemoryRouter>
                <UsersPage
                    users={[]}
                    fetchUsers={spy}
                />
            </MemoryRouter>);
        expect(spy.callCount).toBe(1);
    });

    it('renders the same number of article cards as there are objects in the users array', () => {
        const wrapper = shallow(<UsersPage
            users={users}
            fetchUsers={x => x}
        />);
        const result = wrapper.children().nodes[1].props.children;
        expect(result.length).toBe(3);
        result.forEach((user, i) => {
            expect(user.key).toBe(`northcoder${i + 1}`);
        });
    });

    it('does not render any cards if there are no users', () => {
        const wrapper = shallow(<UsersPage
            users={[]}
            fetchUsers={x => x}
        />);
        const result = wrapper.children().nodes[1].props.children;
        expect(result.length).toBe(0);
    });

    it('calls fetch users on componentDidMount if the users array is empty', () => {
        const spy = sinon.stub();
        mount(<UsersPage
            users={[]}
            fetchUsers={spy}
        />);
        expect(spy.called).toBe(true);
        expect(spy.callCount).toBe(1);
    });
});

