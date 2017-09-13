import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';

import { App } from '../../src/components/App';
import PageNotFound from '../../src/components/PageNotFound';

jest.dontMock('../../src/components/App');

describe('App', () => {
    it('is a function', () => {
        expect(typeof App).toEqual('function');
    });

    it('renders', () => {
        const wrapper = shallow(<App children={<PageNotFound/>}/>);
        expect(wrapper.children().length).toEqual(3);
    });
    
});