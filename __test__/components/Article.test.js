import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

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
            voteArticle={(x) => { return x; }}
            user={user}
            article={article}
        />);
        expect(enzymeWrapper.children().length).toEqual(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <Article
                    voteArticle={(x) => { return x; }}
                    user={user}
                    article={article}
                />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});