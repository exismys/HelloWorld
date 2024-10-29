const fs = require("fs")
const http = require("http");


http.createServer((req, res) => {
    // Reading file and sending as a response
    fs.readFile("temp-html-file.html", (error, data) => {
        res.writeHead(200, {"content-type": "text/html"});
        res.write(data);
        res.end();
    });
}).listen(3000);

// Appends at the end of the file
fs.appendFile("temp-text-file.txt", "How are you?", error => {
    if (error) {
        throw error;
    } else {
        console.log("Appended to the file.");
    }
});

// fs.appendFile() creates a new file if file does not exist
fs.appendFile("temp-text-file-2.txt", "How are you?", error => {
    if (error) {
        throw error;
    } else {
        console.log("Appended to the file 2");
    }
});

// fs.wirteFile() replaces the current file and creates a new file if it does not exist
fs.writeFile("temp-text-file-2.txt", "Replaced Text", error => {
    if (error) throw error;
    else console.log("File updated.");
});

// fs.unlink() deletes the mentioned file
fs.unlink("temp-text-file-2.txt", error => {
    if (error) throw error;
    else console.log("File deleted.");
});
    