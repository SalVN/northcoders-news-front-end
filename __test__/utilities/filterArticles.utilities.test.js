import { returnFilteredArticles } from '../../src/utilities/filterArticles';


describe('#returnFilteredArticles', () => {
    const articles = [{
        _id: '59b01acf006c8dbca914672f',
        title: 'Football is fun',
        body: 'something',
        belongs_to: 'football',
        created_by: 'northcoder1',
        __v: 0,
        votes: 3,
        comment_count: 0
    },
    {
        _id: '59b01acf006c8dbca914672e',
        title: 'Cats are great',
        body: 'something',
        belongs_to: 'cats',
        created_by: 'northcoder2',
        __v: 0,
        votes: 2,
        comment_count: 2
    },{
        _id: '59b01acf006c8dbca914672g',
        title: 'Football is fun',
        body: 'something',
        belongs_to: 'football',
        created_by: 'northcoder1',
        __v: 0,
        votes: 3,
        comment_count: 0
    }];
    it('is a function', () => {
        expect(typeof returnFilteredArticles).toBe('function');
    });

    it('returns an empty array if the username is not defined', () => {
        const result = returnFilteredArticles(articles);
        expect(result.length).toBe(0);
        expect(result).toEqual([]);
    });

    it('returns an array containing just the articles written by the user (one article)', () => {
        const result = returnFilteredArticles(articles, 'northcoder2');
        expect(result.length).toBe(1);
        expect(result[0]).toEqual(articles[1]);
    });

    it('returns an array containing just the articles written by the user (more than one article)', () => {
        const result = returnFilteredArticles(articles, 'northcoder1');
        expect(result.length).toBe(2);
        expect(result[0]).toEqual(articles[0]);
        expect(result[1]).toEqual(articles[2]);
    });

    it('returns an empty array if no articles were written by the user', () => {
        const result = returnFilteredArticles(articles, 'northcoder3');
        expect(result.length).toBe(0);
        expect(result).toEqual([]);
    });

    it('does not mutate the original array', () => {
        const resultA = returnFilteredArticles(articles, 'northcoder3');
        expect(resultA).not.toBe(articles);
        
        const resultB = returnFilteredArticles(articles, 'northcoder1');
        expect(resultB).not.toBe(articles);

    });
});
