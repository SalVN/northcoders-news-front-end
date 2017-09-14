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
        const wrapper = shallow(<AddCommentForm
            user={user}
            id={user._id}
            showForm={true}
            handleSubmit={x => x}
            toggleForm={x => x}
        />);
        expect(wrapper.children().length).toEqual(1);
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
        const wrapper = shallow(<AddCommentForm
            user={user}
            id={user._id}
            showForm={false}
            handleSubmit={x => x}
            toggleForm={x => x}
        />);
        expect(wrapper.find('form').length).toEqual(0);
    });

    it('will shows the form if showForm is true', () => {
        const wrapper = shallow(<AddCommentForm
            user={user}
            id={user._id}
            showForm={true}
            handleSubmit={x => x}
            toggleForm={x => x}
        />);
        expect(wrapper.find('form').length).toEqual(1);
    });

    it('toggles the form if the div is clicked', () => {
        const spy = sinon.stub();
        const wrapper = shallow(<AddCommentForm
            user={user}
            id={user._id}
            showForm={false}
            handleSubmit={x => x}
            toggleForm={spy}
        />);
        expect(spy.called).toBe(false);
        wrapper.find('.comment-form-small').simulate('click', { preventDefault() { } });
        expect(spy.callCount).toBe(1);
    });


    it('toggles the form if the form is blurred', () => {
        const spy = sinon.stub();
        const wrapper = mount(<AddCommentForm
            user={user}
            id={user._id}
            showForm={true}
            handleSubmit={x => x}
            toggleForm={spy}
        />);
        expect(spy.called).toBe(false);
        wrapper.find('textarea').simulate('click');
        wrapper.find('.comment-form').simulate('blur', { preventDefault() { } });
        expect(spy.callCount).toBe(1);
    });

    it('submits the form onSubmit', () => {
        const spy = sinon.stub();
        const wrapper = shallow(<AddCommentForm
            user={user}
            id={user._id}
            showForm={true}
            handleSubmit={spy}
            toggleForm={x => x}
        />);
        wrapper.setState({ 'text': 'foo' });
        wrapper.find('form').simulate('submit');
        expect(spy.callCount).toBe(1);
    });

    it('will disable the form submit if there is no text contained in the box', () => {
        const wrapper = shallow(<AddCommentForm
            user={user}
            id={user._id}
            showForm={true}
            handleSubmit={x => x}
            toggleForm={x => x}
        />);
        expect(wrapper.find('.add-comment-submit').node.props.disabled).toBe(true);

        wrapper.setState({ 'text': 'foo' });
        expect(wrapper.find('.add-comment-submit').node.props.disabled).toBe(false);
    });

    it('displays the characters left', () => {
        const wrapper = shallow(<AddCommentForm
            user={user}
            id={user._id}
            showForm={true}
            handleSubmit={x => x}
            toggleForm={x => x}
        />);
        expect(wrapper.find('.characters-left').node.props.children).toBe(1000);
        wrapper.setState({ 'text': 'hello world' });
        expect(wrapper.find('.characters-left').node.props.children).toBe(989);
    });

    it('changes the state if the form is changed', () => {
        const wrapper = mount(<AddCommentForm
            user={user}
            id={user._id}
            showForm={true}
            handleSubmit={x => x}
            toggleForm={x => x}
        />);
        wrapper.find('textarea').simulate('change', { target: { value: 'text' } });
        expect(wrapper.state('text')).toBe('text');
    });

});