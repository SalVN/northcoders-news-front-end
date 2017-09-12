exports.sortUsers = function (users, sortedBy) {
    if (sortedBy === 'Sort by ranking') {
        users.sort((a, b) => {
            return (b.articles_vote_count + b.comments_vote_count) - (a.articles_vote_count + a.comments_vote_count);
        });
    }
    if (sortedBy === 'Sort by comments') {
        users.sort((a, b) => {
            return (b.comment_count + b.comment_count) - (a.comment_count + a.comment_count);
        });
    }
    if (sortedBy === 'Sort by article votes') {
        users.sort((a, b) => {
            return (b.articles_vote_count) - (a.articles_vote_count);
        });
    }
    if (sortedBy === 'Sort by comment votes') {
        users.sort((a, b) => {
            return (b.comments_vote_count) - (a.comments_vote_count);
        });
    }
    return users;
};