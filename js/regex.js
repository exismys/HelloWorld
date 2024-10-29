// Eloquent JavaScript

// Testing for matches
console.log(/abc/.test("abcde")); // true
console.log(/abc/.test("abxde")); // false

// Set of characters: matching any set of character
console.log(/[0123456789]/.test("in 1992")); // true
console.log(/[0-9]/.test("in 1992")); // true
console.log(/\d/.test("in 1992")); // true

// Invert a set of characters: using ^
let notBinary = /[^01]/;
console.log(notBinary.test("010110100010")); // false
console.log(notBinary.test("1000201110")); // true

// +: matches one or more
// *: zero or more
console.log(/'\d+'/.test("'123'")); // true
console.log(/\d+/.test("'123'")); // true
console.log(/'\d+'/.test("'123")); // false, missing 1 "'"

console.log(/\d*/.test("")); // true
console.log(/\d*/.test("123")); // true

// ?: makes a part of the program option, may occure zero or one times
console.log(/neighou?r/.test("neighour")); // true
console.log(/neighou?r/.test("neighor")); // true

// {a}: to occur only a times
// {a, b}: to occur atleast a time and atmost b times
console.log(/a{4}/.test("aaaa")); // true
console.log(/a{4}/.test("aaa")); // false
console.log(/a{2,4}/.test("aaa")); // true

// (): grouping subexpressions
console.log(/(aa){2,4}/.test("aaaa")); // true

// exec: to get more information about the match
let match = /\d+/.exec("one two 300");
console.log(match); // ['300', index: 8, input: 'one two 300', groups: undefined]
console.log(match.index); // 8
