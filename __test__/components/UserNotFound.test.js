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
        const wrapper = shallow(<UserNotFound />);
        expect(wrapper.children().length).toEqual(2);
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
        const wrapper = shallow(<UserNotFound />);
        expect(wrapper.find('Link').length).toBe(1);
    });

});