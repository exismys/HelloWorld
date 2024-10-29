const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
    const readableStream = fs.createReadStream(__dirname + "/large-text-file.txt", "utf-8");
    // const writableStream = fs.createWriteStream(__dirname + "/uploads/written-from-writable-stream.txt");
    // readableStream.on("data", chunk => {
    //     res.write(chunk);
    //     writableStream.write(chunk);
    // });
    res.writeHead(200, {"content-type": "text/plain"});
    readableStream.pipe(res);
}).listen(8000);