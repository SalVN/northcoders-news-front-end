exports.getIndex = function (array, id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i]._id === id) {
      return i;
    }
  }
};

exports.getIndexUsername = function (array, username) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].username === username) {
      return i;
    }
  }
};
