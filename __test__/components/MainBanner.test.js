import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';


import MainBanner from '../../src/components/MainBanner';

describe('MainBanner', () => {
    it('is a function', () => {
        expect(typeof MainBanner).toEqual('function');
    });

    it('renders', () => {
        const wrapper = shallow(<MainBanner />);
        expect(wrapper.children().length).toEqual(1);
    });

    it('contains the title NORTHCODERS News', () => {
        const wrapper = shallow(<MainBanner />);
        expect(wrapper.find('h1').nodes[0].props.children.props.children).toBe('NORTHCODERS News');
    });

    it('contains one link', () => {
        const wrapper = shallow(<MainBanner />);
        expect(wrapper.find('Link').length).toBe(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <MainBanner />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});