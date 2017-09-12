import { getIndex } from '../../src/utilities/getIndex';


describe('#getIndex', () => {
    const comments = [{
        _id: '59b11ae18807841d9bf13234',
        body: 'comment 1',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder',
        votes: 0,
        created_at: 1504778977306
    },
    {
        _id: '59b11ae18807841d9bf13235',
        body: 'comment 2',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder',
        votes: 0,
        created_at: 1504778965843
    },
    {
        _id: '59b11ae18807841d9bf13236',
        body: 'comment 3',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder',
        votes: 0,
        created_at: 1504778976245
    }];
    it('is a function', () => {
        expect(typeof getIndex).toBe('function');
    });

    it('should return the index of the provided id', () => {
        const idA = '59b11ae18807841d9bf13234';
        const resultA = getIndex(comments, idA);
        expect(resultA).toBe(0);

        const idB = '59b11ae18807841d9bf13236';
        const resultB = getIndex(comments, idB);
        expect(resultB).toBe(2);
    });
});
