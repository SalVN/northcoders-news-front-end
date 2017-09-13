import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';


import PageNotFound from '../../src/components/PageNotFound';

describe('PageNotFound', () => {
    it('is a function', () => {
        expect(typeof PageNotFound).toEqual('function');
    });

    it('renders', () => {
        const enzymeWrapper = shallow(<PageNotFound />);
        expect(enzymeWrapper.children().length).toEqual(2);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <PageNotFound />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contains one link', () => {
        const enzymeWrapper = shallow(<PageNotFound />);
        expect(enzymeWrapper.find('Link').length).toBe(1);
    });
});