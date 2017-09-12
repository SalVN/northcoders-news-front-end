import { sortUsers } from '../src/utilities/sortUsers';


describe('#sortUsers', () => {
    const users = [{
        _id: '59b1b18b327cce1fb043bdb2',
        username: 'user1',
        name: 'User One',
        comment_count: 15,
        comments_vote_count: 20,
        articles_vote_count: 20,
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }, {
        _id: '59b1b18b327cce1fb043bdb3',
        username: 'user2',
        name: 'User Two',
        comment_count: 9,
        comments_vote_count: 50,
        articles_vote_count: 10,
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }, {
        _id: '59b1b18b327cce1fb043bdb4',
        username: 'user3',
        name: 'User Three',
        comment_count: 12,
        comments_vote_count: 30,
        articles_vote_count: 40,
        avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200',
        __v: 0
    }];

    it('is a function', () => {
        expect(typeof sortUsers).toBe('function');
    });

    it('returns an unsorted array if sortedBy is not defined', () => {
        const result = sortUsers(users);
        expect(result[0].username).toBe('user1');
        expect(result[1].username).toBe('user2');
        expect(result[2].username).toBe('user3');
    });

    it('sorts the users by the ranking if sortedBy === "Sort by ranking"', () => {
        const result = sortUsers(users, 'Sort by ranking');
        expect(result[0].username).toBe('user3');
        expect(result[1].username).toBe('user2');
        expect(result[2].username).toBe('user1');
    });

    it('sorts the users by number of comments made if sortedBy === "Sort by comments"', () => {
        const result = sortUsers(users, 'Sort by comments');
        expect(result[0].username).toBe('user1');
        expect(result[1].username).toBe('user3');
        expect(result[2].username).toBe('user2');
    });

    it('sorts the users by comment votes if sortedBy === "Sort by comment votes"', () => {
        const result = sortUsers(users, 'Sort by comment votes');
        expect(result[0].username).toBe('user2');
        expect(result[1].username).toBe('user3');
        expect(result[2].username).toBe('user1');
    });

    it('sorts the users by article votes if sortedBy === "Sort by article votes"', () => {
        const result = sortUsers(users, 'Sort by article votes');
        expect(result[0].username).toBe('user3');
        expect(result[1].username).toBe('user1');
        expect(result[2].username).toBe('user2');
    });

    it('mutates the original array', () => {
        const resultA = sortUsers(users, 'Sort by ranking');
        expect(resultA).toBe(users);

        const resultB = sortUsers(users);
        expect(resultB).toBe(users);
    });
});
