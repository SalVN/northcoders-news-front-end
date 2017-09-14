import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';

import Article from '../../src/components/Article';

describe('Article', () => {
    const article = {
        _id: '59b01acf006c8dbca914672f',
        title: 'Football is fun',
        body: 'something',
        belongs_to: 'football',
        __v: 0,
        votes: 3,
        comment_count: 0
    };
    const user = {
        _id: '59b1b18b327cce1fb043bdb2',
        username: 'northcoder',
        name: 'Awesome Northcoder',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    };
    it('is a function', () => {
        expect(typeof Article).toEqual('function');
    });

    it('renders', () => {
        const enzymeWrapper = shallow(<Article
            voteArticle={x => x}
            user={user}
            article={article}
        />);
        expect(enzymeWrapper.children().length).toEqual(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <Article
                    voteArticle={x => x}
                    user={user}
                    article={article}
                />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contains two links', () => {
        const enzymeWrapper = shallow(<Article
            voteArticle={x => x}
            user={user}
            article={article}
        />);
        expect(enzymeWrapper.find('Link').length).toBe(2);
    });

    it('calls the voteHandler function when the "up" button is clicked', () => {
        const spy = sinon.stub();
        const enzymeWrapper = shallow(<Article
            voteArticle={spy}
            user={user}
            article={article}
        />);
        expect(spy.called).toBe(false);
        enzymeWrapper.find('.up').simulate('click', { preventDefault() { } });
        expect(spy.called).toBe(true);
    });

    it('calls the voteHandler function when the "down" button is clicked', () => {
        const spy = sinon.stub();
        const enzymeWrapper = shallow(<Article
            voteArticle={spy}
            user={user}
            article={article}
        />);
        expect(spy.called).toBe(false);
        enzymeWrapper.find('.down').simulate('click', { preventDefault() { } });
        expect(spy.called).toBe(true);
    });

    it('does not render the avatar if user is not defined', () => {
        const enzymeWrapper1 = shallow(<Article
            voteArticle={x => x}
            user={null}
            article={article}
        />);
        expect(enzymeWrapper1.find('img').length).toBe(0);

        const enzymeWrapper2 = shallow(<Article
            voteArticle={x => x}
            user={user}
            article={article}
        />);
        expect(enzymeWrapper2.find('img').length).toBe(1);
    });
});