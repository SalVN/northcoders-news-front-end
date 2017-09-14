import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';

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

    it('will not show the form if showForm is false', () => {
        const enzymeWrapper = shallow(<AddCommentForm
            user={user}
            id={user._id}
            showForm={false}
            handleSubmit={x => x}
            toggleForm={x => x}
        />);
        expect(enzymeWrapper.find('form').length).toEqual(0);
    });

    it('will shows the form if showForm is true', () => {
        const enzymeWrapper = shallow(<AddCommentForm
            user={user}
            id={user._id}
            showForm={true}
            handleSubmit={x => x}
            toggleForm={x => x}
        />);
        expect(enzymeWrapper.find('form').length).toEqual(1);
    });

    it('toggles the form if the div is clicked', () => {
        const spy = sinon.stub();
        const enzymeWrapper = shallow(<AddCommentForm
            user={user}
            id={user._id}
            showForm={false}
            handleSubmit={x => x}
            toggleForm={spy}
        />);
        expect(spy.called).toBe(false);
        enzymeWrapper.find('.comment-form-small').simulate('click', { preventDefault() { } });
        expect(spy.callCount).toBe(1);
    });


    it('toggles the form if the form is blurred', () => {
        const spy = sinon.stub();
        const enzymeWrapper = mount(<AddCommentForm
            user={user}
            id={user._id}
            showForm={true}
            handleSubmit={x => x}
            toggleForm={spy}
        />);
        expect(spy.called).toBe(false);
        enzymeWrapper.find('textarea').simulate('click');
        enzymeWrapper.find('.comment-form').simulate('blur', { preventDefault() { } });
        expect(spy.callCount).toBe(1);
    });

    it('submits the form onSubmit', () => {
        const spy = sinon.stub();
        const enzymeWrapper = shallow(<AddCommentForm
            user={user}
            id={user._id}
            showForm={true}
            handleSubmit={spy}
            toggleForm={x => x}
        />);
        enzymeWrapper.setState({ 'text': 'foo' });
        enzymeWrapper.find('form').simulate('submit');
        expect(spy.callCount).toBe(1);
    });

    it('will disable the form submit if there is no text contained in the box', () => {
        const enzymeWrapper = shallow(<AddCommentForm
            user={user}
            id={user._id}
            showForm={true}
            handleSubmit={x => x}
            toggleForm={x => x}
        />);
        expect(enzymeWrapper.find('.add-comment-submit').node.props.disabled).toBe(true);

        enzymeWrapper.setState({ 'text': 'foo' });
        expect(enzymeWrapper.find('.add-comment-submit').node.props.disabled).toBe(false);
    });

    it('displays the characters left', () => {
        const enzymeWrapper = shallow(<AddCommentForm
            user={user}
            id={user._id}
            showForm={true}
            handleSubmit={x => x}
            toggleForm={x => x}
        />);
        expect(enzymeWrapper.find('.characters-left').node.props.children).toBe(1000);
        enzymeWrapper.setState({ 'text': 'hello world' });
        expect(enzymeWrapper.find('.characters-left').node.props.children).toBe(989);
    });

    it('changes the state if the form is changed', () => {
        const enzymeWrapper = mount(<AddCommentForm
            user={user}
            id={user._id}
            showForm={true}
            handleSubmit={x => x}
            toggleForm={x => x}
        />);
        enzymeWrapper.find('textarea').simulate('change', { target: { value: 'text' } });
        expect(enzymeWrapper.state('text')).toBe('text');
    });

});