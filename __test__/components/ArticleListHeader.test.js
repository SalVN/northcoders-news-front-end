import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Route, MemoryRouter } from 'react-router-dom';


import ArticleListHeader from '../../src/components/ArticleListHeader';

describe('ArticleListHeader', () => {
    it('is a function', () => {
        expect(typeof ArticleListHeader).toEqual('function');
    });

    it('renders', () => {
        const enzymeWrapper = shallow(<ArticleListHeader />);
        expect(enzymeWrapper.children().length).toEqual(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <ArticleListHeader />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});