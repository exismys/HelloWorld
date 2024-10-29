/**
 * Promise.race(): Promise.race(iterable) method returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves or rejects, with the value or reason from that promise.
 */

let promise1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve({ message: "Promise 1 resolved" });
    console.log("Line after promise 1 resolved"); // This line gets executed even after promise 1 is resolved
  }, 2000);
});

let promise2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve({ message: "Promise 2 resolved" });
    console.log("Line after promise 2 resolved") // This line gets executed even after promise 2 is resolved
    setInterval(() => {
        console.log("Promise 2 is still going on...");
      }, 1000);
  }, 10000);
});

// 
Promise.race([promise1, promise2]).then((result) => {
  console.log(result.message);
});
