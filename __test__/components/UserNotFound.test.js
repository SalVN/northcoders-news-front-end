import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';


import UserNotFound from '../../src/components/UserNotFound';

describe('UserNotFound', () => {
    it('is a function', () => {
        expect(typeof UserNotFound).toEqual('function');
    });

    it('renders', () => {
        const enzymeWrapper = shallow(<UserNotFound />);
        expect(enzymeWrapper.children().length).toEqual(2);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <UserNotFound />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contains one link', () => {
        const enzymeWrapper = shallow(<UserNotFound />);
        expect(enzymeWrapper.find('Link').length).toBe(1);
    });

});