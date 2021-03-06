import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import UserPageCard from '../../src/components/UserPageCard';

describe('UserPageCard', () => {
    const user = {
        _id: '59b1b18b327cce1fb043bdb1',
        username: 'northcoder',
        name: 'Awesome Northcoder',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    };
    it('is a function', () => {
        expect(typeof UserPageCard).toEqual('function');
    });

    it('renders', () => {
        const wrapper = shallow(<UserPageCard
            user={user}
            articlesNo={5}
            ranking={2}
        />);
        expect(wrapper.children().length).toEqual(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <UserPageCard
                    user={user}
                    articlesNo={5}
                    ranking={2}
                />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});