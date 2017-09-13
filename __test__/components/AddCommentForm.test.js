import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import AddCommentForm from '../../src/components/AddCommentForm';

describe('AddCommentForm', () => {
    const user = {
        _id: '59b1b18b327cce1fb043bdb1',
        username: 'northcoder',
        name: 'Awesome Northcoder',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    };
    it('is a function', () => {
        expect(typeof AddCommentForm).toEqual('function');
    });

    it('renders', () => {
        const enzymeWrapper = shallow(<AddCommentForm
            user={user}
            id={user._id}
            showForm={true}
            handleSubmit={x => x}
            toggleForm={x => x}
        />);
        expect(enzymeWrapper.children().length).toEqual(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <AddCommentForm
                    user={user}
                    id={user._id}
                    showForm={false}
                    handleSubmit={x => x}
                    toggleForm={x => x}
                />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});