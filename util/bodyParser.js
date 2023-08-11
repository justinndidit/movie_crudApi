module.exports = function bodyParser(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (err) {
      reject(err.message);
    }
  });
};
