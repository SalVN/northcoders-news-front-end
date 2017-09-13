import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';


import ArticleListHeader from '../../src/components/ArticleListHeader';

describe('ArticleListHeader', () => {
    it('is a function', () => {
        expect(typeof ArticleListHeader).toEqual('function');
    });

    it('renders', () => {
        const enzymeWrapper = shallow(<ArticleListHeader
            title={'abcdefg'}
            handleClickSelect={x => x}
            toggleDropdown={x => x}
            showDropdown={false}
        />);
        expect(enzymeWrapper.children().length).toEqual(1);
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
});