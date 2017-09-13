import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import { UsersPage } from '../../src/components/UsersPage';

describe('UsersPage', () => {
    const users = [{
        _id: '59b1b18b327cce1fb043bdb1',
        username: 'northcoder',
        name: 'Awesome Northcoder',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }];
    it('is a function', () => {
        expect(typeof UsersPage).toEqual('function');
    });

    it('renders', () => {
        const enzymeWrapper = shallow(<UsersPage
            users={users}
            fetchUsers={x => x}
        />);
        expect(enzymeWrapper.children().length).toEqual(2);
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
});