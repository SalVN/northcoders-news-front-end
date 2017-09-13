import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

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
    it('is a function', () => {
        expect(typeof ArticleCard).toEqual('function');
    });

    it('renders', () => {
        const enzymeWrapper = shallow(<ArticleCard
            title={article.title}
            votes={article.votes}
            number={1}
            author={article.created_by}
            id={article._id}
            tags={article.belongs_to}
            comment_count={article.comment_count}
            voteHandler={x => x}
        />);
        expect(enzymeWrapper.children().length).toEqual(1);
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
                />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});