exports.sortArticles = function (articles, sortedBy) {
    if (sortedBy === 'comments') {
        articles.sort((a, b) => {
            return b.comment_count - a.comment_count;
        });
    }
    if (sortedBy === 'votes') {
        articles.sort((a, b) => {
            return b.votes - a.votes;
        });
    }
    if (sortedBy === 'random') {
        articles.forEach(article => {
            article['random'] = Math.random();
        });
        articles.sort(function (a, b) {
            return a.random - b.random;
        });
    }
    return articles;
};