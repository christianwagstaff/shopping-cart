function findAtIndexAndDelete(array, id) {
  // Make a copy of the array as to not mutate it
  let newArray = [...array];
  let index = newArray.findIndex((x) => x._id === id);
  if (index === -1) {
    return array;
  }
  newArray.splice(index, 1);
  return newArray;
}

export {findAtIndexAndDelete}