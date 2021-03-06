exports.sortComments = function (comments, sortedBy) {
    if (sortedBy === 'newest') {
        comments.sort((a, b) => {
            return b.created_at - a.created_at;
        });
    }
    if (sortedBy === 'oldest') {
        comments.sort((a, b) => {
            return a.created_at - b.created_at;
        });
    }
    if (sortedBy === 'votes') {
        comments.sort((a, b) => {
            return b.votes - a.votes;
        });
    }
    return comments;
};