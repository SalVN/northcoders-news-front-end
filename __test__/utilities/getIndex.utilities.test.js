import { getIndex, getIndexUsername } from '../../src/utilities/getIndex';

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

describe('#getIndexUsername', () => {
    const users = [{
        _id: '59b1b18b327cce1fb043bdb1',
        username: 'user1',
        name: 'One',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }, {
        _id: '59b1b18b327cce1fb043bdb2',
        username: 'user2',
        name: 'Two',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }, {
        _id: '59b1b18b327cce1fb043bdb3',
        username: 'user3',
        name: 'Three',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }, {
        _id: '59b1b18b327cce1fb043bdb4',
        username: 'user4',
        name: 'Four',
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }];
    it('is a function', () => {
        expect(typeof getIndexUsername).toBe('function');
    });

    it('should return the index of the provided id', () => {
        const idA = 'user2';
        const resultA = getIndexUsername(users, idA);
        expect(resultA).toBe(1);

        const idB = 'user4';
        const resultB = getIndexUsername(users, idB);
        expect(resultB).toBe(3);
    });
});

