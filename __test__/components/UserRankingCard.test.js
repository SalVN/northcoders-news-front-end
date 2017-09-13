import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Route, MemoryRouter } from 'react-router-dom';

import UserRankingCard from '../../src/components/UserRankingCard';

describe('UserRankingCard', () => {
    const user = {
        _id: '59b1b18b327cce1fb043bdb1',
        username: 'northcoder',
        name: 'Awesome Northcoder',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    };
    it('is a function', () => {
        expect(typeof UserRankingCard).toEqual('function');
    });

    it('renders', () => {
        const enzymeWrapper = shallow(<UserRankingCard
            user={user}
        />);
        expect(enzymeWrapper.children().length).toEqual(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <UserRankingCard
                    user={user}
                />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});