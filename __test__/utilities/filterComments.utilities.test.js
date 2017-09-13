import { returnFilteredComments } from '../../src/utilities/filterComments';

describe('#returnFilteredComments', () => {
    const comments = [{
        _id: '59b11ae18807841d9bf13234',
        body: 'this is a comment',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder1',
        votes: 0,
        created_at: 1504778965845
    },
    {
        _id: '59b11ae18807841d9bf13235',
        body: 'this is another comment',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder2',
        votes: 0,
        created_at: 1504778965845
    },
    {
        _id: '59b11ae18807841d9bf13236',
        body: 'this is my comment',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder1',
        votes: 0,
        created_at: 1504778977306
    }];
    it('is a function', () => {
        expect(typeof returnFilteredComments).toBe('function');
    });

    it('returns an empty array if the username is not defined', () => {
        const result = returnFilteredComments(comments);
        expect(result.length).toBe(0);
        expect(result).toEqual([]);
    });

    it('returns an array containing just the comments written by the user (one comment)', () => {
        const result = returnFilteredComments(comments, 'northcoder2');
        expect(result.length).toBe(1);
        expect(result[0]).toEqual(comments[1]);
    });

    it('returns an array containing just the comments written by the user (more than one comment)', () => {
        const result = returnFilteredComments(comments, 'northcoder1');
        expect(result.length).toBe(2);
        expect(result[0]).toEqual(comments[0]);
        expect(result[1]).toEqual(comments[2]);
    });

    it('returns an empty array if no comments were written by the user', () => {
        const result = returnFilteredComments(comments, 'northcoder3');
        expect(result.length).toBe(0);
        expect(result).toEqual([]);
    });

    it('does not mutate the original array', () => {
        const resultA = returnFilteredComments(comments, 'northcoder3');
        expect(resultA).not.toBe(comments);
        
        const resultB = returnFilteredComments(comments, 'northcoder1');
        expect(resultB).not.toBe(comments);

    });
});
