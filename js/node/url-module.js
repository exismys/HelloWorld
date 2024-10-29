const url = require('url');

// Web address
const address = "https://www.something.com/somepath?name=somename&age=someage";

// Parsing the url into named components
let parsedURL = url.parse(address, true); // parsedURL is now an object with component names keys and their values as values
console.log(parsedURL);

// Printing the hostname
console.log(parsedURL.hostname)

// Printing the search component
console.log(parsedURL.search)

// Printing the pathname
console.log(parsedURL.pathname);

// Getting the search queries
let searchQueries = parsedURL.query; // searchQueries is an object with search queries
console.log(searchQueries);
