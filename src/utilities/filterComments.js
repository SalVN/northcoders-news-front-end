exports.returnFilteredComments = function (comments, username) {
    return comments.filter((comment) => {
        return comment.created_by === username;
    });
};