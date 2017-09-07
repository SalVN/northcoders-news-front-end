exports.getIndex = function (comments, deletedId) {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i]._id === deletedId) {
      return i;
    }
  }
};