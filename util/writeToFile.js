const fs = require("fs");
const path = require("path");

module.exports = function writeFile(data) {
  fs.writeFileSync(
    path.join(__dirname, "..", "data", "movies.json"),
    JSON.stringify(data),
    "utf-8"
  );
};
