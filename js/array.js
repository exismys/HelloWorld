var obj = {
  a: 100,
  b: "Hello World",
  25: 50,
};

// Dot Notation
console.log(obj.a); // 100
console.log(obj.b); // Hello World
// console.log(obj.25); property name used should be a valid variable name

// Bracket Notation
// Needs to be a variable or a string literal
// console.log(obj[a]); // ReferenceError: a is not defined
console.log(obj["a"]); // 100
console.log(obj[25]); // 50
console.log(obj["25"]); // 50

var array = [100, "Hello World", true];

console.log(array[0], array[1], array[2]); // 100 Hello World true
