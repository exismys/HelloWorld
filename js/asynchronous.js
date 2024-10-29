let callbackFunction = function() {
    console.log("This is a callback function");
}
let sayName = function(name) {
    console.log(name);
}

setTimeout(callbackFunction, 1000);
sayName("Exismys"); // This line does not wait for the previous setTimeout call to be completed

/*
Exismys
This is a callback function
*/