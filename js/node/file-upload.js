const formidable = require("formidable");
const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
    if (req.url == "/fileupload") {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            const oldPath = files.filetoupload.filepath;
            const newPath = "C:/Users/rites/OneDrive/Documents/Code/HelloJavaScript/node/upload_storage/" + files.filetoupload.originalFilename;
            fs.rename(oldPath, newPath, err => {
                if (err) throw err
                else {
                    console.log("File uploaded to " + newPath);
                    res.write("File uploaded.");
                    res.end();
                }
            });
        });
    } else {
        res.writeHead(200, {"content-type": "text/html"});
        res.write('<form action="/fileupload" method="post" enctype="multipart/form-data"><input type="file" name="filetoupload"></input><br></br><input type="submit"></input></form>');
        res.end();
    }
}).listen(8000);