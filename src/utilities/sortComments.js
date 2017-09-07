exports.sortComments = function (comments, sortedBy) {
    if (sortedBy === 'newest') {
        comments.sort((a, b) => {
            return b.created_at - a.created_at;
        });
    }
    return comments;
};