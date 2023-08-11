const { getMovies } = require("../controller/controller.js");

module.exports = function getReq(req, res) {
  getMovies(req, res);
};
