import { sortArticles } from '../src/utilities/sortArticles';


describe('#sortArticles', () => {
    const articles = [{
        _id: '59b01acf006c8dbca914672f',
        title: 'Article 1',
        body: 'something',
        belongs_to: 'football',
        __v: 0,
        votes: 3,
        comment_count: 2
    },
    {
        _id: '59b01acf006c8dbca914672f',
        title: 'Article 2',
        body: 'something',
        belongs_to: 'football',
        __v: 0,
        votes: 6,
        comment_count: 9
    },
    {
        _id: '59b01acf006c8dbca914672f',
        title: 'Article 3',
        body: 'something',
        belongs_to: 'football',
        __v: 0,
        votes: 20,
        comment_count: 1
    },
    {
        _id: '59b01acf006c8dbca914672e',
        title: 'Article 4',
        body: 'something',
        belongs_to: 'cats',
        __v: 0,
        votes: 0,
        comment_count: 6
    }];
    it('is a function', () => {
        expect(typeof sortArticles).toBe('function');
    });

    it('returns an unsorted array if sortedBy is not defined', () => {
        const result = sortArticles(articles);
        expect(result[0].title).toBe('Article 1');
        expect(result[1].title).toBe('Article 2');
        expect(result[2].title).toBe('Article 3');
        expect(result[3].title).toBe('Article 4');
    });

    it('sorts the articles by the date if sortedBy === "votes"', () => {
        const result = sortArticles(articles, 'votes');
        expect(result[0].title).toBe('Article 3');
        expect(result[1].title).toBe('Article 2');
        expect(result[2].title).toBe('Article 1');
        expect(result[3].title).toBe('Article 4');
    });

    it('sorts the articles by the number of votes if sortedBy === "comments"', () => {
        const result = sortArticles(articles, 'comments');
        expect(result[0].title).toBe('Article 2');
        expect(result[1].title).toBe('Article 4');
        expect(result[2].title).toBe('Article 1');
        expect(result[3].title).toBe('Article 3');
    });

    it('returns an array of the correct length if sortedBy === "random"', () => {
        const result = sortArticles(articles, 'random');
        expect(result.length).toEqual(4);
        result.forEach(article => {
            expect(typeof article.random).toEqual('number');
        });
    });

    it('mutates the original array', () => {
        const resultA = sortArticles(articles, 'votes');
        expect(resultA).toBe(articles);

        const resultB = sortArticles(articles);
        expect(resultB).toBe(articles);
    });
});
