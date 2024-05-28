// Create web server

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

// Read the comments file and return the comments
const getComments = () => {
  const comments = fs.readFileSync("comments.json", "utf-8");
  return comments;
};

// Write the comments to the file
const writeComments = (comments) => {
  fs.writeFileSync("comments.json", comments);
};

// Create the server
http.createServer((req, res) => {
  // Get the path
  const reqUrl = url.parse(req.url, true);
  const pathname = reqUrl.pathname;

  // If the path is /comments, return the comments
  if (pathname === "/comments") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(getComments());
  }

  // If the path is /save, save the comments
  else if (pathname === "/save") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      writeComments(body);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Comments saved successfully");
    });
  }

  // If the path is /, return the index.html file
  else if (pathname === "/") {
    const filePath = path.join(__dirname, "index.html");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404 Not Found");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }

  // If the path is not found, return 404
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("404 Not Found");
  }
}).listen(8080);
console.log("Server running at http://localhost:8080/");
