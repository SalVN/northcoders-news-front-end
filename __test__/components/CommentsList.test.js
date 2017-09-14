import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';

const mockStore = configureStore();
const initialState = {};

import CommentsList from '../../src/components/CommentsList';

describe('CommentsList', () => {
    const users = [{
        _id: '59b1b18b327cce1fb043bdb1',
        username: 'northcoder',
        name: 'Awesome Northcoder',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }, {
        _id: '59b1b18b327cce1fb043bdb2',
        username: 'javascripter',
        name: 'Awesome Javascripter',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }];
    const comments = [{
        _id: '59b11ae18807841d9bf13234',
        body: 'this is a comment',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder',
        votes: 40,
        created_at: 1504778970000
    },
    {
        _id: '59b11ae18807841d9bf13235',
        body: 'this is another comment',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder',
        votes: 30,
        created_at: 1504778990000
    },
    {
        _id: '59b11ae18807841d9bf13236',
        body: 'this is my comment',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder',
        votes: 20,
        created_at: 1504778980000
    }];

    it('is a function', () => {
        expect(typeof CommentsList).toEqual('function');
    });

    it('renders', () => {
        const wrapper = shallow(<CommentsList
            id={comments[0]._id}
            comments={comments}
            users={users}
            deleteHandler={x => x}
            voteHandler={x => x}
            maximum={2}
            viewMoreComments={x => x}
            sortedBy='newest'
            sortComments={x => x}
        />);
        expect(wrapper.children().length).toEqual(4);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <CommentsList
                    id={'59b11ae18807841d9bf13234'}
                    comments={comments}
                    users={users}
                    deleteHandler={x => x}
                    voteHandler={x => x}
                    maximum={2}
                    sortedBy='newest'
                    sortComments={x => x}
                    viewMoreComments={x => x} />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('sorts the comments if sortedBy is given as a prop', () => {
        const wrapperNewest = shallow(
            <CommentsList
                id={comments[0]._id}
                comments={comments}
                users={users}
                deleteHandler={x => x}
                voteHandler={x => x}
                maximum={10}
                viewMoreComments={x => x}
                sortedBy='newest'
                sortComments={x => x}
            />);
        expect(wrapperNewest.find('.comment-card').nodes[0].key).toBe('59b11ae18807841d9bf13235');
        expect(wrapperNewest.find('.comment-card').nodes[1].key).toBe('59b11ae18807841d9bf13236');
        expect(wrapperNewest.find('.comment-card').nodes[2].key).toBe('59b11ae18807841d9bf13234');

        const wrapperOldest = shallow(
            <CommentsList
                id={comments[0]._id}
                comments={comments}
                users={users}
                deleteHandler={x => x}
                voteHandler={x => x}
                maximum={10}
                viewMoreComments={x => x}
                sortedBy='oldest'
                sortComments={x => x}
            />);
        expect(wrapperOldest.find('.comment-card').nodes[2].key).toBe('59b11ae18807841d9bf13235');
        expect(wrapperOldest.find('.comment-card').nodes[1].key).toBe('59b11ae18807841d9bf13236');
        expect(wrapperOldest.find('.comment-card').nodes[0].key).toBe('59b11ae18807841d9bf13234');

        const wrapperVotes = shallow(
            <CommentsList
                id={comments[0]._id}
                comments={comments}
                users={users}
                deleteHandler={x => x}
                voteHandler={x => x}
                maximum={10}
                viewMoreComments={x => x}
                sortedBy='votes'
                sortComments={x => x}
            />);
        expect(wrapperVotes.find('.comment-card').nodes[2].key).toBe('59b11ae18807841d9bf13236');
        expect(wrapperVotes.find('.comment-card').nodes[1].key).toBe('59b11ae18807841d9bf13235');
        expect(wrapperVotes.find('.comment-card').nodes[0].key).toBe('59b11ae18807841d9bf13234');
    });

    it('gives "sort by newest" the class comment-sort-active if sortedBy === newest', () => {
        const wrapper = shallow(
            <CommentsList
                id={comments[0]._id}
                comments={comments}
                users={users}
                deleteHandler={x => x}
                voteHandler={x => x}
                maximum={10}
                viewMoreComments={x => x}
                sortedBy='newest'
                sortComments={x => x}
            />);
        expect(wrapper.find('.newest').nodes[0].props.className).toBe('newest comment-sort-active');
        expect(wrapper.find('.oldest').nodes[0].props.className).toBe('oldest comment-sort-links');
        expect(wrapper.find('.votes').nodes[0].props.className).toBe('votes comment-sort-links');
    });

    it('gives "sort by votes" the class comment-sort-active if sortedBy === votes', () => {
        const wrapper = shallow(
            <CommentsList
                id={comments[0]._id}
                comments={comments}
                users={users}
                deleteHandler={x => x}
                voteHandler={x => x}
                maximum={10}
                viewMoreComments={x => x}
                sortedBy='votes'
                sortComments={x => x}
            />);
        expect(wrapper.find('.newest').nodes[0].props.className).toBe('newest comment-sort-links');
        expect(wrapper.find('.oldest').nodes[0].props.className).toBe('oldest comment-sort-links');
        expect(wrapper.find('.votes').nodes[0].props.className).toBe('votes comment-sort-active');
    });

    it('gives "sort by oldest" the class comment-sort-active if sortedBy === oldest', () => {
        const wrapper = shallow(
            <CommentsList
                id={comments[0]._id}
                comments={comments}
                users={users}
                deleteHandler={x => x}
                voteHandler={x => x}
                maximum={10}
                viewMoreComments={x => x}
                sortedBy='oldest'
                sortComments={x => x}
            />);
        expect(wrapper.find('.newest').nodes[0].props.className).toBe('newest comment-sort-links');
        expect(wrapper.find('.oldest').nodes[0].props.className).toBe('oldest comment-sort-active');
        expect(wrapper.find('.votes').nodes[0].props.className).toBe('votes comment-sort-links');
    });

    it('only renders up to the maximum number of comments', () => {
        const wrapperA = shallow(
            <CommentsList
                id={comments[0]._id}
                comments={comments}
                users={users}
                deleteHandler={x => x}
                voteHandler={x => x}
                maximum={10}
                viewMoreComments={x => x}
                sortedBy='oldest'
                sortComments={x => x}
            />);
        expect(wrapperA.find('CommentCard').length).toBe(3);

        const wrapperB = shallow(
            <CommentsList
                id={comments[0]._id}
                comments={comments}
                users={users}
                deleteHandler={x => x}
                voteHandler={x => x}
                maximum={1}
                viewMoreComments={x => x}
                sortedBy='oldest'
                sortComments={x => x}
            />);
        expect(wrapperB.find('CommentCard').length).toBe(1);
    });

    it('shows the showMore button if the comment array length is smaller than the maximum', () => {

        const enzymeWrapperA = shallow(
            <CommentsList
                id={comments[0]._id}
                comments={comments}
                users={users}
                deleteHandler={x => x}
                voteHandler={x => x}
                maximum={3}
                viewMoreComments={x => x}
                sortedBy='oldest'
                sortComments={x => x}
            />);
        expect(enzymeWrapperA.find('.show-more-button').length).toEqual(0);

        const enzymeWrapperB = shallow(
            <CommentsList
                id={comments[0]._id}
                comments={comments}
                users={users}
                deleteHandler={x => x}
                voteHandler={x => x}
                maximum={8}
                viewMoreComments={x => x}
                sortedBy='oldest'
                sortComments={x => x}
            />);
        expect(enzymeWrapperB.find('.show-more-button').length).toEqual(0);

        const enzymeWrapperC = shallow(
            <CommentsList
                id={comments[0]._id}
                comments={comments}
                users={users}
                deleteHandler={x => x}
                voteHandler={x => x}
                maximum={1}
                viewMoreComments={x => x}
                sortedBy='oldest'
                sortComments={x => x}
            />);
        expect(enzymeWrapperC.find('.show-more-button').length).toEqual(1);
    });

    it('triggers the handleClickSelect prop function if the option is clicked', () => {
        const spyNewest = sinon.stub();
        const spyOldest = sinon.stub();
        const spyVotes = sinon.stub();

        const enzymeWrapperNewest = shallow(
            <CommentsList
                id={comments[0]._id}
                comments={comments}
                users={users}
                deleteHandler={x => x}
                voteHandler={x => x}
                maximum={10}
                viewMoreComments={x => x}
                sortedBy='newest'
                sortComments={spyNewest}
            />);
        expect(spyNewest.callCount).toBe(0);
        enzymeWrapperNewest.find('.newest').simulate('click', { preventDefault() { } });
        expect(spyNewest.callCount).toBe(1);


        const enzymeWrapperOldest = shallow(
            <CommentsList
                id={comments[0]._id}
                comments={comments}
                users={users}
                deleteHandler={x => x}
                voteHandler={x => x}
                maximum={10}
                viewMoreComments={x => x}
                sortedBy='oldest'
                sortComments={spyOldest}
            />);
        expect(spyOldest.callCount).toBe(0);
        enzymeWrapperOldest.find('.oldest').simulate('click', { preventDefault() { } });
        expect(spyOldest.callCount).toBe(1);


        const enzymeWrapperVotes = shallow(
            <CommentsList
                id={comments[0]._id}
                comments={comments}
                users={users}
                deleteHandler={x => x}
                voteHandler={x => x}
                maximum={10}
                viewMoreComments={x => x}
                sortedBy='votes'
                sortComments={spyVotes}
            />);
        expect(spyVotes.callCount).toBe(0);
        enzymeWrapperVotes.find('.votes').simulate('click', { preventDefault() { } });
        expect(spyVotes.callCount).toBe(1);
    });

});