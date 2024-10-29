const importedVariable = require("./a");
console.log("This is module b");
let variable = "module b variable";

console.log(importedVariable);
console.log(variable);

// The module which is being imported get executed exactly one time