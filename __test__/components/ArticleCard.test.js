import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Route, MemoryRouter } from 'react-router-dom';

import ArticleCard from '../../src/components/ArticleCard';

describe('ArticleCard', () => {
    it('is a function', () => {
        expect(typeof ArticleCard).toEqual('function');
    });

    it('renders', () => {
        const enzymeWrapper = shallow(<ArticleCard voteHandler={(x) => { return x; }} />);
        expect(enzymeWrapper.children().length).toEqual(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <ArticleCard voteHandler={(x) => { return x; }} />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});