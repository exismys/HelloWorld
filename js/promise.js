/**
 * Promise: A promise is an object that may produce a single value some time in the future: either a resolved value, or a reason that it’s not resolved (e.g., a network error occurred). A promise may be in one of 3 possible states: fulfilled, rejected, or pending. Promise users can attach callbacks to handle the fulfilled value or the reason for rejection.
 */


let promise = new Promise(function(resolve, reject) {
  // the function is executed automatically when the promise is constructed

  // after 3 second signal that the job is done with the result "Promise resolved"
  setTimeout(() => resolve({message: "Promise resolved"}), 3000);
});

console.log("Promise created"); // Promise created (output immediately)

// resolve runs the first function in .then
promise.then((result) => {
  console.log(result.message); // shows "Promise resolved" after 3 seconds
});