import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import ReactShallowRenderer from 'react-test-renderer/shallow';

const mockStore = configureStore();
const initialState = {};

import { App } from '../../src/components/App';
import PageNotFound from '../../src/components/PageNotFound';

describe('App', () => {
    it('is a function', () => {
        expect(typeof App).toEqual('function');
    });

    it('renders', () => {
        const wrapper = shallow(<App children={<PageNotFound />} />);
        expect(wrapper.children().length).toEqual(3);
    });

    it('renders correctly', () => {
        const store = mockStore(initialState);
        const renderer = new ReactShallowRenderer();
        const tree = renderer.render(
            <Provider store={store}>
                <MemoryRouter>
                    <App children={<PageNotFound />} />
                </MemoryRouter>
            </Provider>
        );
        expect(tree).toMatchSnapshot();
    });
});