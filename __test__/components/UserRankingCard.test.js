import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import UserRankingCard from '../../src/components/UserRankingCard';

describe('UserRankingCard', () => {
    const user = {
        _id: '59b1b18b327cce1fb043bdb1',
        username: 'northcoder',
        name: 'Awesome Northcoder',
        comment_count: 5,
        articles_vote_count: 20,
        comments_vote_count: 30,
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    };
    it('is a function', () => {
        expect(typeof UserRankingCard).toEqual('function');
    });

    it('renders', () => {
        const wrapper = shallow(<UserRankingCard
            user={user}
            index={0}
            criteria={'Sort by ranking'}
        />);
        expect(wrapper.children().length).toEqual(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <UserRankingCard
                    user={user}
                    index={0}
                    criteria={'Sort by ranking'}
                />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contains one link', () => {
        const wrapper = shallow(<UserRankingCard
            user={user}
            index={0}
            criteria={'Sort by ranking'}
        />);
        expect(wrapper.find('Link').length).toBe(1);
    });

    it('renders the total of article votes and comment votes for the user if criteria === Sort by ranking', () => {
        const wrapper = shallow(<UserRankingCard
            user={user}
            index={0}
            criteria={'Sort by ranking'}
        />);
        expect(wrapper.find('.user-list-card-ranking-number').node.props.children).toBe(50);
    });

    it('renders the total number of comments  for the user if criteria === Sort by comments', () => {
        const wrapper = shallow(<UserRankingCard
            user={user}
            index={0}
            criteria={'Sort by comments'}
        />);
        expect(wrapper.find('.user-list-card-ranking-number').node.props.children).toBe(5);
    });

    it('renders the total article votes for the user if criteria === Sort by article votes', () => {
        const wrapper = shallow(<UserRankingCard
            user={user}
            index={0}
            criteria={'Sort by article votes'}
        />);
        expect(wrapper.find('.user-list-card-ranking-number').node.props.children).toBe(20);
    });

    it('renders the total comment votes for the user if criteria === Sort by comment votes', () => {
        const wrapper = shallow(<UserRankingCard
            user={user}
            index={0}
            criteria={'Sort by comment votes'}
        />);
        expect(wrapper.find('.user-list-card-ranking-number').node.props.children).toBe(30);
    });
});