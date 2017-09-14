import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';

import ArticleCard from '../../src/components/ArticleCard';

describe('ArticleCard', () => {
    const article = {
        _id: '59b01acf006c8dbca914672f',
        title: 'Football is fun',
        body: 'something',
        belongs_to: 'football',
        __v: 0,
        votes: 3,
        created_by: 'northcoder',
        comment_count: 0
    };
    const user = {
        _id: '59b1b18b327cce1fb043bdb1',
        username: 'northcoder',
        name: 'Awesome Northcoder',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    };
    it('is a function', () => {
        expect(typeof ArticleCard).toEqual('function');
    });

    it('renders', () => {
        const wrapper = shallow(<ArticleCard
            title={article.title}
            votes={article.votes}
            number={1}
            author={article.created_by}
            id={article._id}
            tags={article.belongs_to}
            comment_count={article.comment_count}
            voteHandler={x => x}
            userData={user}
        />);
        expect(wrapper.children().length).toEqual(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <ArticleCard
                    title={article.title}
                    votes={article.votes}
                    number={1}
                    author={article.created_by}
                    id={article._id}
                    tags={article.belongs_to}
                    comment_count={article.comment_count}
                    voteHandler={x => x}
                    userData={user}
                />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contains three links', () => {
        const wrapper = shallow(<ArticleCard
            title={article.title}
            votes={article.votes}
            number={1}
            author={article.created_by}
            id={article._id}
            tags={article.belongs_to}
            comment_count={article.comment_count}
            voteHandler={x => x}
            userData={user}
        />);
        expect(wrapper.find('Link').length).toBe(3);
    });

    it('calls the voteHandler function when the "up" button is clicked', () => {
        const spy = sinon.stub();
        const wrapper = shallow(<ArticleCard
            title={article.title}
            votes={article.votes}
            number={1}
            author={article.created_by}
            id={article._id}
            tags={article.belongs_to}
            comment_count={article.comment_count}
            voteHandler={spy}
            userData={user}
        />);
        expect(spy.called).toBe(false);
        wrapper.find('.up').simulate('click', { preventDefault() { } });
        expect(spy.called).toBe(true);
    });

    it('calls the voteHandler function when the "down" button is clicked', () => {
        const spy = sinon.stub();
        const wrapper = shallow(<ArticleCard
            title={article.title}
            votes={article.votes}
            number={1}
            author={article.created_by}
            id={article._id}
            tags={article.belongs_to}
            comment_count={article.comment_count}
            voteHandler={spy}
            userData={user}
        />);
        expect(spy.called).toBe(false);
        wrapper.find('.down').simulate('click', { preventDefault() { } });
        expect(spy.called).toBe(true);
    });

    it('renders an article number which is one more than the index', () => {
        const wrapper = shallow(<ArticleCard
            title={article.title}
            votes={article.votes}
            number={1}
            author={article.created_by}
            id={article._id}
            tags={article.belongs_to}
            comment_count={article.comment_count}
            voteHandler={x => x}
            userData={user}
        />);
        expect(wrapper.find('.article-number').node.props.children).toBe(2);
    });

    it('only renders the userData link if the userData exists', () => {
        const enzymeWrapperA = shallow(<ArticleCard
            title={article.title}
            votes={article.votes}
            number={1}
            author={article.created_by}
            id={article._id}
            tags={article.belongs_to}
            comment_count={article.comment_count}
            voteHandler={x => x}
            userData={null}
        />);
        expect(enzymeWrapperA.find('img').length).toBe(0);
        expect(enzymeWrapperA.find('Link').length).toBe(2);

        const enzymeWrapperB = shallow(<ArticleCard
            title={article.title}
            votes={article.votes}
            number={1}
            author={article.created_by}
            id={article._id}
            tags={article.belongs_to}
            comment_count={article.comment_count}
            voteHandler={x => x}
            userData={user}
        />);
        expect(enzymeWrapperB.find('img').length).toBe(1);
        expect(enzymeWrapperB.find('Link').length).toBe(3);
    });
});