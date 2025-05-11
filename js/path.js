// Function to find a sequence of fixed operations to reach a target
// Starting from 1, we can either add 5 or multiply 3 repeatedly  to reach a target number

function findPath(target) {
  function find(current, history) {
    if (current == target) {
      return history;
    } else if (current > target) {
      return null;
    } else {
      return find(current + 5, `(${history} + 5)`) || find(current * 3, `(${history} * 3)`);
    }
  }
  return find(1, "1");
}

let path = findPath(25);
console.log(path ? path : "Target can not be reached!");
