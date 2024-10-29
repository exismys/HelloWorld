// Load HTTP module
const http = require("http");

const hostname = "127.0.0.1";
const port = 8000;

// Create HTTP server
const server = http.createServer((request, response) => {
    console.log(`Request URL: ${request.url}`);

    if (request.url == "/about") {
        response.end("In about");
    } else {
        // Set the response HTTP header with HTTP status and Content type
        response.writeHead(200, {'Content-Type': 'text/plain'});

        // Send the response body "Hello World"
        response.end('Hello World\n');
    }
    
});

// Prints a log once the server starts listening
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});