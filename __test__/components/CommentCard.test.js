import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';

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

    const otherUserComment = {
        _id: '59b11ae18807841d9bf13234',
        body: 'this is a comment',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'not_northcoder',
        votes: 1,
        created_at: 1504778965845
    };

    const user = {
        _id: '59b1b18b327cce1fb043bdb1',
        username: 'northcoder',
        name: 'Awesome Northcoder',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    };

    it('is a function', () => {
        expect(typeof CommentCard).toEqual('function');
    });

    it('renders', () => {
        const wrapper = shallow(<CommentCard
            voteHandler={(x) => { return x; }}
            deleteHandler={(x) => { return x; }}
            comment={comment}
            userData={user}
        />);
        expect(wrapper.children().length).toEqual(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <CommentCard
                    voteHandler={x => x}
                    deleteHandler={x => x}
                    comment={comment}
                    userData={user}
                />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contains one link', () => {
        const wrapper = shallow(<CommentCard
            voteHandler={x => x}
            deleteHandler={x => x}
            comment={comment}
            userData={user}
        />);
        expect(wrapper.find('Link').length).toBe(1);
    });

    it('renders a delete button if the comment was added by the user', () => {
        const wrapper = shallow(<CommentCard
            voteHandler={(x) => { return x; }}
            deleteHandler={(x) => { return x; }}
            comment={comment}
            userData={user}
        />);
        expect(wrapper.find('.delete-button').length).toEqual(1);
    });

    it('does not render a delete button if the comment was added by a different user', () => {
        const wrapper = shallow(<CommentCard
            voteHandler={(x) => { return x; }}
            deleteHandler={(x) => { return x; }}
            comment={otherUserComment}
            userData={user}
        />);
        expect(wrapper.find('.delete-button').length).toEqual(0);
    });

    it('calls the voteHandler function when the "up" button is clicked', () => {
        const spy = sinon.stub();
        const wrapper = shallow(<CommentCard
            voteHandler={spy}
            deleteHandler={(x) => { return x; }}
            comment={comment}
            userData={user}
        />);
        expect(spy.called).toBe(false);
        wrapper.find('.up').simulate('click', { preventDefault() { } });
        expect(spy.called).toBe(true);
    });

    it('calls the voteHandler function when the "down" button is clicked', () => {
        const spy = sinon.stub();
        const wrapper = shallow(<CommentCard
            voteHandler={spy}
            deleteHandler={(x) => { return x; }}
            comment={comment}
            userData={user}
        />);
        expect(spy.called).toBe(false);
        wrapper.find('.down').simulate('click', { preventDefault() { } });
        expect(spy.called).toBe(true);
    });

    it('calls the deleteHandler function when the "delete" button is clicked', () => {
        const spy = sinon.stub();
        const wrapper = shallow(<CommentCard
            voteHandler={x => x}
            deleteHandler={spy}
            comment={comment}
            userData={user}
        />);
        expect(spy.called).toBe(false);
        wrapper.find('.delete-button').simulate('click', { preventDefault() { } });
        expect(spy.called).toBe(true);
    });
});