/**
 *
 * @param {Boolean[]} arr
 */

module.exports = (arr) => {
  let trueCount = 0;
  let falseCount = 0;
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (typeof element !== "boolean") {
      continue;
    } else {
      if (element == true) {
        trueCount++;
      } else {
        falseCount++;
      }
    }
  }
  if(trueCount >= falseCount) {
    return true
  } else {
    return falseCount
  }
};
