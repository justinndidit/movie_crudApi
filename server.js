const http = require("http");

const getReq = require("./methods/getMovie");
const putReq = require("./methods/putMovie");
const deleteReq = require("./methods/deleteMovie");
const postReq = require("./methods/postMovie");

const server = http.createServer((req, res) => {
  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;
    case "DELETE":
      deleteReq(req, res);
      break;
    case "PUT":
      putReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader("content-type", "application/json");
      res.write(
        JSON.stringify({ title: "Not Found", message: "Route not found" })
      );
      res.end();
  }
});

server.listen(5001, () => {
  console.log("Hello on Port 5001");
});
