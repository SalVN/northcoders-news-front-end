exports.getIndex = function (array, deletedId) {
  for (let i = 0; i < array.length; i++) {
    if (array[i]._id === deletedId) {
      return i;
    }
  }
};