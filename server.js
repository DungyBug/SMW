const http = require("http");
const fs = require("fs");

function TypeMime(name) {
    let type = name.replace(/.+?\./, '');
    switch(type) {
        case "html": {
            type = "text/html";
            break;
        };
        case "js": {
            type = "text/javascript";
            break;
        };
        case "css": {
            type = "text/css";
            break;
        };
        case "png": {
            type = "image/png";
            break;
        };
        case "mp3": {
            type = "audio/mp3";
            break;
        };
    }

    return type;
}

http.createServer((req, res) => {
    fs.readFile(req.url.replace(/./, ''), (err, data) => {
        res.writeHead(200, {"Content-Type": TypeMime(req.url.replace(/./, ''))});
        res.end(data);
    });
}).listen(80);