import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';

import ArticleListHeader from '../../src/components/ArticleListHeader';

describe('ArticleListHeader', () => {
    it('is a function', () => {
        expect(typeof ArticleListHeader).toEqual('function');
    });

    it('renders', () => {
        const wrapper = shallow(<ArticleListHeader
            title={'abcdefg'}
            handleClickSelect={x => x}
            toggleDropdown={x => x}
            showDropdown={false}
        />);
        expect(wrapper.children().length).toEqual(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <ArticleListHeader
                    title={'abcdefg'}
                    handleClickSelect={x => x}
                    toggleDropdown={x => x}
                    showDropdown={false} />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('triggers the toggleDropdown function (prop) if the button is clicked', () => {
        const spy = sinon.stub();
        const wrapper = shallow(<ArticleListHeader
            title={'abcdefg'}
            handleClickSelect={x => x}
            toggleDropdown={spy}
            showDropdown={false}
        />);
        expect(spy.callCount).toBe(0);
        wrapper.find('.dropdown-button-article-list').simulate('click', { preventDefault() { } });
        expect(spy.callCount).toBe(1);
    });

    it('shows the dropdown only if the showDropdown prop is true', () => {
        const enzymeWrapperA = shallow(<ArticleListHeader
            title={'abcdefg'}
            handleClickSelect={x => x}
            toggleDropdown={x => x}
            showDropdown={false}
        />);
        expect(enzymeWrapperA.find('.dropdown').node.props.className).toBe('dropdown has-text-left ');

        const enzymeWrapperB = shallow(<ArticleListHeader
            title={'abcdefg'}
            handleClickSelect={x => x}
            toggleDropdown={x => x}
            showDropdown={true}
        />);
        expect(enzymeWrapperB.find('.dropdown').node.props.className).toBe('dropdown has-text-left is-active');
    });

    it('triggers the handleClickSelect prop function if the option is clicked', () => {
        const spyPopular = sinon.stub();
        const spyComment = sinon.stub();
        const spyRandom = sinon.stub();

        const enzymeWrapperPopular = shallow(<ArticleListHeader
            title={'abcdefg'}
            handleClickSelect={spyPopular}
            toggleDropdown={x => x}
            showDropdown={true}
        />);
        expect(spyPopular.callCount).toBe(0);
        enzymeWrapperPopular.find('.popular').simulate('click', { preventDefault() { } });
        expect(spyPopular.callCount).toBe(1);

        const enzymeWrapperComment = shallow(<ArticleListHeader
            title={'abcdefg'}
            handleClickSelect={spyComment}
            toggleDropdown={x => x}
            showDropdown={true}
        />);
        expect(spyComment.callCount).toBe(0);
        enzymeWrapperComment.find('.comments').simulate('click', { preventDefault() { } });
        expect(spyComment.callCount).toBe(1);

        const enzymeWrapperRandom = shallow(<ArticleListHeader
            title={'abcdefg'}
            handleClickSelect={spyRandom}
            toggleDropdown={x => x}
            showDropdown={true}
        />);
        expect(spyRandom.callCount).toBe(0);
        enzymeWrapperRandom.find('.random').simulate('click', { preventDefault() { } });
        expect(spyRandom.callCount).toBe(1);
    });
});