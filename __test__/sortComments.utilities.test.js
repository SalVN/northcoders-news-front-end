import { sortComments } from '../src/utilities/sortComments';


describe('#sortComments', () => {
    const comments = [{
        _id: '59b11ae18807841d9bf13234',
        body: 'comment 1',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder',
        votes: 8,
        created_at: 1504778977306
    },
    {
        _id: '59b11ae18807841d9bf13235',
        body: 'comment 2',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder',
        votes: 5,
        created_at: 1504778965843
    },
    {
        _id: '59b11ae18807841d9bf13236',
        body: 'comment 3',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder',
        votes: 12,
        created_at: 1504778976245
    }];
    it('is a function', () => {
        expect(typeof sortComments).toBe('function');
    });

    it('returns an unsorted array if sortedBy is not defined', () => {
        const result = sortComments(comments);
        expect(result[0].body).toBe('comment 1');
        expect(result[1].body).toBe('comment 2');
        expect(result[2].body).toBe('comment 3');
    });

    it('sorts the comments by the date if sortedBy === "newest"', () => {
        const result = sortComments(comments, 'newest');
        expect(result[0].body).toBe('comment 1');
        expect(result[1].body).toBe('comment 3');
        expect(result[2].body).toBe('comment 2');
    });

    it('sorts the comments by date if sortedBy === "votes"', () => {
        const result = sortComments(comments, 'votes');
        expect(result[0].body).toBe('comment 3');
        expect(result[1].body).toBe('comment 1');
        expect(result[2].body).toBe('comment 2');
    });


    it('sorts the comments by date if sortedBy === "oldest"', () => {
        const result = sortComments(comments, 'oldest');
        expect(result[0].body).toBe('comment 2');
        expect(result[1].body).toBe('comment 3');
        expect(result[2].body).toBe('comment 1');
    });


    it('mutates the original array', () => {
        const resultA = sortComments(comments, 'newest');
        expect(resultA).toBe(comments);

        const resultB = sortComments(comments);
        expect(resultB).toBe(comments);
    });
});
