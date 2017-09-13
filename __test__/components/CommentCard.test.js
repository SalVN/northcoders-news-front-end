import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Route, MemoryRouter } from 'react-router-dom';

import CommentCard from '../../src/components/CommentCard';

describe('CommentCard', () => {
    const comment = {
        _id: '59b11ae18807841d9bf13234',
        body: 'this is a comment',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder',
        votes: 1,
        created_at: 1504778965845
    };
    it('is a function', () => {
        expect(typeof CommentCard).toEqual('function');
    });

    it('renders', () => {
        const enzymeWrapper = shallow(<CommentCard
            voteHandler={(x) => { return x; }}
            deleteHandler={(x) => { return x; }}
            comment={comment}
        />);
        expect(enzymeWrapper.children().length).toEqual(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <CommentCard
                    voteHandler={(x) => { return x; }}
                    deleteHandler={(x) => { return x; }}
                    comment={comment}
                />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});