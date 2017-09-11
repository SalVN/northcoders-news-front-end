exports.returnFilteredArticles = function (articles, username) {
    return articles.filter((article) => {
        return article.created_by === username;
    });
};