import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { App } from '../../src/components/App';

jest.dontMock('../../src/components/App');

describe('App', () => {
    it('is a function', () => {
        expect(typeof App).toEqual('function');
    });

    it('renders', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.children().length).toEqual(3);
    });
    
});