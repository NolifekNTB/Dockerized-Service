const http = require("http");
require("dotenv").config();

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, world!");
    return;
  }

  if (req.url === "/secret") {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Basic ")) {
      res.writeHead(401, {
        "WWW-Authenticate": 'Basic realm="Secret Area"',
        "Content-Type": "text/plain",
      });
      res.end("Authentication required");
      return;
    }

    const encoded = authHeader.split(" ")[1];
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const [username, password] = decoded.split(":");

    if (
      username === process.env.USERNAME &&
      password === process.env.PASSWORD
    ) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(process.env.SECRET_MESSAGE);
      return;
    }

    res.writeHead(401, { "Content-Type": "text/plain" });
    res.end("Invalid username or password");
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
